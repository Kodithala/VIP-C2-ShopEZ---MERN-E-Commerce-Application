import { createContext, useContext, useMemo, useState } from 'react';
import api from '../services/api.js';

const CartContext = createContext(null);
const GUEST_CART_KEY = 'shopezGuestCart';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ products: [] });
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('shopezUser') || 'null');
      if (!user) {
        const guest = JSON.parse(localStorage.getItem(GUEST_CART_KEY) || JSON.stringify({ products: [] }));
        // ensure product objects are populated for render
        for (let i = 0; i < guest.products.length; i++) {
          const entry = guest.products[i];
          if (entry && typeof entry.product === 'string') {
            try {
              const { data } = await api.get(`/products/${entry.product}`);
              guest.products[i].product = data;
            } catch (e) {
              // remove invalid product
              guest.products.splice(i, 1);
              i--;
            }
          }
        }
        localStorage.setItem(GUEST_CART_KEY, JSON.stringify(guest));
        setCart(guest);
        return guest;
      }

      const { data } = await api.get('/cart');
      setCart(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    const user = JSON.parse(localStorage.getItem('shopezUser') || 'null');
    if (!user) {
      const guest = JSON.parse(localStorage.getItem(GUEST_CART_KEY) || JSON.stringify({ products: [] }));
      // check for existing by product id
      const itemIndex = guest.products.findIndex((p) => (p.product && p.product._id ? p.product._id === productId : p.product === productId));
      if (itemIndex > -1) {
        guest.products[itemIndex].quantity = Math.min(guest.products[itemIndex].quantity + Number(quantity), 9999);
      } else {
        // fetch product details for display
        try {
          const { data: product } = await api.get(`/products/${productId}`);
          guest.products.push({ product, quantity: Number(quantity) });
        } catch (e) {
          // fallback to storing id
          guest.products.push({ product: productId, quantity: Number(quantity) });
        }
      }
      localStorage.setItem(GUEST_CART_KEY, JSON.stringify(guest));
      setCart(guest);
      return guest;
    }

    const { data } = await api.post('/cart/add', { productId, quantity });
    setCart(data);
    return data;
  };

  const updateCartItem = async (productId, quantity) => {
    const user = JSON.parse(localStorage.getItem('shopezUser') || 'null');
    if (!user) {
      const guest = JSON.parse(localStorage.getItem(GUEST_CART_KEY) || JSON.stringify({ products: [] }));
      const item = guest.products.find((p) => (p.product && p.product._id ? p.product._id === productId : p.product === productId));
      if (item) item.quantity = Math.max(1, Number(quantity));
      localStorage.setItem(GUEST_CART_KEY, JSON.stringify(guest));
      setCart(guest);
      return guest;
    }

    const { data } = await api.put('/cart/update', { productId, quantity });
    setCart(data);
    return data;
  };

  const removeCartItem = async (productId) => {
    const user = JSON.parse(localStorage.getItem('shopezUser') || 'null');
    if (!user) {
      const guest = JSON.parse(localStorage.getItem(GUEST_CART_KEY) || JSON.stringify({ products: [] }));
      guest.products = guest.products.filter((entry) => (entry.product && entry.product._id ? entry.product._id !== productId : entry.product !== productId));
      localStorage.setItem(GUEST_CART_KEY, JSON.stringify(guest));
      setCart(guest);
      return guest;
    }

    const { data } = await api.delete(`/cart/remove/${productId}`);
    setCart(data);
    return data;
  };

  const total = cart.products?.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0) || 0;
  const count = cart.products?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const value = useMemo(
    () => ({ cart, loading, total, count, fetchCart, addToCart, updateCartItem, removeCartItem, setCart }),
    [cart, loading, total, count]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
