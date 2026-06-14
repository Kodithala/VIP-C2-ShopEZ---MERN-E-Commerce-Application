import { createContext, useContext, useMemo, useState } from 'react';
import api from '../services/api.js';

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, pages: 1 });
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (params = {}) => {
    setLoading(true);
    try {
      const { data } = await api.get('/products', { params });
      setProducts(data.products || data || []);
      setMeta({ total: data.total || data.length || 0, page: data.page || 1, pages: data.pages || 1 });
      return data;
    } catch (error) {
      setProducts([]);
      setMeta({ total: 0, page: 1, pages: 1 });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getProduct = async (id) => {
    const { data } = await api.get(`/products/${id}`);
    return data;
  };

  const saveProduct = async (product) => {
    if (product._id) {
      const { data } = await api.put(`/products/${product._id}`, product);
      return data;
    }
    const { data } = await api.post('/products', product);
    return data;
  };

  const deleteProduct = async (id) => {
    await api.delete(`/products/${id}`);
  };

  const value = useMemo(
    () => ({ products, meta, loading, fetchProducts, getProduct, saveProduct, deleteProduct }),
    [products, meta, loading]
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProducts = () => useContext(ProductContext);
