import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AlertMessage from '../components/AlertMessage.jsx';
import Loading from '../components/Loading.jsx';
import { useProducts } from '../context/ProductContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { formatINR } from '../utils/currency.js';

const ProductDetails = () => {
  const { id } = useParams();
  const { getProduct } = useProducts();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    getProduct(id).then(setProduct).catch(() => setError('Product not found'));
  }, [id]);

  const add = async () => {
    await addToCart(product._id, quantity);
    navigate('/cart');
  };

  if (error) return <div className="container py-4"><AlertMessage>{error}</AlertMessage></div>;
  if (!product) return <Loading />;

  return (
    <div className="container py-5">
      <div className="row g-5">
        <div className="col-lg-6">
          <img
            className="detail-image"
            src={product.image || 'https://via.placeholder.com/600x400?text=No+Image'}
            alt={product.name}
          />
        </div>
        <div className="col-lg-6">
          <div className="text-uppercase text-muted small">{product.brand} / {product.category}</div>
          <h1 className="h2 mt-2">{product.name}</h1>
          <p className="lead">{product.description}</p>
          <div className="display-6 fw-semibold mb-2">{formatINR(product.price)}</div>
          <p>Stock: <strong>{product.stock}</strong></p>
          <p>Rating: <strong>{product.rating} / 5</strong></p>
          <div className="d-flex gap-2 align-items-center">
            <input className="form-control qty-input" type="number" min="1" max={product.stock} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
            <button className="btn btn-warning btn-lg" disabled={product.stock < 1} onClick={add}>Add To Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
