import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || ' https://testing-d17g.onrender.com'
});

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('shopezUser') || 'null');
  if (user?.token) config.headers.Authorization = `Bearer ${user.token}`;
  return config;
});

export default api;
