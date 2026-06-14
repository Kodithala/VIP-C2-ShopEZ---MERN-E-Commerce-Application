import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import Loading from '../components/Loading.jsx';
import { useCart } from '../context/CartContext.jsx';
import { formatINR } from '../utils/currency.js';

const Cart = () => {
  const { cart, total, loading, fetchCart, updateCartItem, removeCartItem } = useCart();

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="container py-4">
      <h1 className="h2 mb-4">Cart</h1>
      {!cart.products?.length ? (
        <div className="alert alert-info">Your cart is empty.</div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table align-middle">
              <thead><tr><th>Product Name</th><th>Quantity</th><th>Price</th><th>Total</th><th /></tr></thead>
              <tbody>
                {cart.products.map((item) => (
                  <tr key={item.product._id}>
                    <td>{item.product.name}</td>
                    <td><input className="form-control qty-input" type="number" min="1" value={item.quantity} onChange={(e) => updateCartItem(item.product._id, Number(e.target.value))} /></td>
                    <td>{formatINR(item.product.price)}</td>
                    <td>{formatINR(item.product.price * item.quantity)}</td>
                    <td><button className="btn btn-outline-danger btn-sm" onClick={() => removeCartItem(item.product._id)} title="Remove product"><Trash2 size={16} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-end align-items-center gap-3">
            <h2 className="h4 mb-0">Total: {formatINR(total)}</h2>
            <Link className="btn btn-warning" to="/checkout">Checkout</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
