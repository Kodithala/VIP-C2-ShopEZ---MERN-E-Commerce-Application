import { useEffect, useState } from 'react';
import Loading from '../components/Loading.jsx';
import api from '../services/api.js';
import { formatINR } from '../utils/currency.js';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/orders/myorders').then(({ data }) => setOrders(data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="container py-4">
      <h1 className="h2 mb-4">Order History</h1>
      {orders.length === 0 ? <div className="alert alert-info">No orders yet.</div> : (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead><tr><th>ID</th><th>Date</th><th>Total</th><th>Distance</th><th>Payment</th><th>Status</th></tr></thead>
            <tbody>{orders.map((order) => <tr key={order._id}><td>{order._id}</td><td>{new Date(order.createdAt).toLocaleDateString()}</td><td>{formatINR(order.totalAmount)}</td><td>{order.shippingAddress?.distanceKm ? `${order.shippingAddress.distanceKm} km` : '-'}</td><td>{order.paymentStatus}</td><td>{order.orderStatus}</td></tr>)}</tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
