import { useEffect, useMemo, useState } from 'react';
import { LocateFixed, MapPin, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AlertMessage from '../components/AlertMessage.jsx';
import api from '../services/api.js';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { DEFAULT_SERVICE_STATION, getDeliveryStatus } from '../utils/delivery.js';

const Checkout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState({ name: '', address: '', city: '', state: '', postalCode: '', phone: '' });
  const [deliveryLocation, setDeliveryLocation] = useState(null);
  const [serviceStation, setServiceStation] = useState(DEFAULT_SERVICE_STATION);
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState('');
  const { setCart } = useCart();
  const deliveryStatus = useMemo(() => getDeliveryStatus(deliveryLocation, serviceStation), [deliveryLocation, serviceStation]);

  useEffect(() => {
    api.get('/orders/delivery-zone').then(({ data }) => setServiceStation(data)).catch(() => {});
  }, []);

  const detectLocation = () => {
    setError('');
    if (!navigator.geolocation) {
      setError('Location service is not supported by this browser');
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setDeliveryLocation({ latitude: coords.latitude, longitude: coords.longitude });
        setLocating(false);
      },
      () => {
        setError('Please allow location access so we can confirm delivery availability');
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  const submit = async (e) => {
    e.preventDefault();
    
    // Redirect to register if not authenticated
    if (!user) {
      navigate('/register', { state: { returnTo: '/checkout', message: 'Please create an account or login to complete your order' } });
      return;
    }

    if (Object.values(shippingAddress).some((value) => !value.trim())) return setError('All checkout fields are required');
    if (!deliveryLocation) return setError('Please detect your delivery location before placing the order');
    if (!deliveryStatus.eligible) return setError(`Delivery is available only within ${serviceStation.radiusKm} km of ${serviceStation.name}`);
    try {
      await api.post('/orders', {
        shippingAddress: {
          ...shippingAddress,
          latitude: deliveryLocation.latitude,
          longitude: deliveryLocation.longitude
        }
      });
      setCart({ products: [] });
      navigate('/orders');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not place order');
    }
  };

  return (
    <div className="container checkout-container">
      <div className="checkout-heading">
        <div>
          <span className="page-kicker">Secure checkout</span>
          <h1 className="h2 mb-1">Delivery Details</h1>
          <p className="text-muted mb-0">Orders can be delivered within {serviceStation.radiusKm} km of {serviceStation.name}.</p>
        </div>
        <div className="station-chip">
          <MapPin size={18} />
          <span>{serviceStation.address}</span>
        </div>
      </div>
      <AlertMessage>{error}</AlertMessage>
      {!user && (
        <div className="alert alert-info mb-4">
          <strong>Login or register to continue.</strong> You need an account to complete your order.
        </div>
      )}
      <form className="checkout-grid" onSubmit={submit}>
        <div className="card card-body checkout-card">
          <h2 className="h5 mb-3">Shipping Address</h2>
          <div className="row g-3">
            {Object.keys(shippingAddress).map((key) => (
              <div className={key === 'address' ? 'col-12' : 'col-md-6'} key={key}>
                <label className="form-label text-capitalize">{key.replace('postalCode', 'Postal Code')}</label>
                <input className="form-control" required disabled={!user} value={shippingAddress[key]} onChange={(e) => setShippingAddress({ ...shippingAddress, [key]: e.target.value })} />
              </div>
            ))}
          </div>
        </div>
        <aside className="card card-body checkout-card delivery-panel">
          <div className="delivery-icon"><Navigation size={24} /></div>
          <h2 className="h5">Location Service</h2>
          <p className="text-muted">Use your current location to confirm the delivery point is inside the service area.</p>
          <button className="btn btn-outline-dark w-100" type="button" onClick={detectLocation} disabled={locating || !user}>
            <LocateFixed size={18} />
            {locating ? 'Detecting...' : 'Detect Location'}
          </button>
          <div className={`delivery-status ${deliveryLocation ? (deliveryStatus.eligible ? 'is-valid' : 'is-invalid') : ''}`}>
            {deliveryLocation ? (
              <>
                <strong>{deliveryStatus.distanceKm} km from station</strong>
                <span>{deliveryStatus.eligible ? 'Delivery available for this location' : `Outside the ${serviceStation.radiusKm} km delivery limit`}</span>
              </>
            ) : (
              <>
                <strong>Location pending</strong>
                <span>Required before generating the order</span>
              </>
            )}
          </div>
          <button type="submit" className="btn btn-warning w-100" disabled={!user || !deliveryLocation || !deliveryStatus.eligible}>
            {!user ? 'Login to Generate Order' : 'Generate Order'}
          </button>
        </aside>
      </form>
    </div>
  );
};

export default Checkout;

