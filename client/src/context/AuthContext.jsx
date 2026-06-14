import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../services/api.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('shopezUser') || 'null'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) localStorage.setItem('shopezUser', JSON.stringify(user));
    else localStorage.removeItem('shopezUser');
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/auth/login', { email, password });
      setUser(data);
      // ensure token is available to API immediately
      try { localStorage.setItem('shopezUser', JSON.stringify(data)); } catch (e) {}

      // merge guest cart if present
      try {
        const guest = JSON.parse(localStorage.getItem('shopezGuestCart') || 'null');
        if (guest?.products?.length) {
          await api.post('/cart/merge', { items: guest.products.map((p) => ({ productId: p.product._id || p.product, quantity: p.quantity })) });
          localStorage.removeItem('shopezGuestCart');
        }
      } catch (e) {
        // ignore merge errors
      }

      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/auth/register', payload);
      setUser(data);
      try { localStorage.setItem('shopezUser', JSON.stringify(data)); } catch (e) {}

      // merge guest cart if present
      try {
        const guest = JSON.parse(localStorage.getItem('shopezGuestCart') || 'null');
        if (guest?.products?.length) {
          await api.post('/cart/merge', { items: guest.products.map((p) => ({ productId: p.product._id || p.product, quantity: p.quantity })) });
          localStorage.removeItem('shopezGuestCart');
        }
      } catch (e) {
        // ignore merge errors
      }

      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (payload) => {
    const { data } = await api.put('/auth/profile', payload);
    setUser(data);
    return data;
  };

  const logout = () => setUser(null);

  const value = useMemo(
    () => ({ user, loading, error, login, register, logout, updateProfile, isAdmin: user?.role === 'ADMIN' }),
    [user, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
