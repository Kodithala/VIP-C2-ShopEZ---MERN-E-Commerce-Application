import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { formatINR } from '../utils/currency.js';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();

  return (
    <div className="product-card h-100">
      <div className="product-media">
        <img
          src={product.image || 'https://via.placeholder.com/400?text=No+Image'}
          loading="lazy"
          className="product-image"
          alt={product.name || 'Product image'}
        />
        <span className="product-badge">{product.category}</span>
      </div>
      <div className="card-body d-flex flex-column">
        <div className="small text-muted">{product.brand}</div>
        <h5 className="card-title mt-1">{product.name}</h5>
        <p className="card-text text-muted flex-grow-1">{product.description}</p>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <strong className="price-text">{formatINR(product.price)}</strong>
          <span className="rating-pill">{product.rating} / 5</span>
        </div>
        <div className="stock-line">{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</div>
        <div className="d-flex gap-2">
          <Link className="btn btn-outline-dark flex-grow-1" to={`/products/${product._id}`}>View Details</Link>
          <button className="btn btn-warning icon-button" disabled={product.stock < 1} onClick={() => addToCart(product._id, 1)} title="Add to cart">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
