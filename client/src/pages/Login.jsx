import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AlertMessage from '../components/AlertMessage.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const authMessage = location.state?.message || '';

  const submit = async (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setMessage('Enter a valid email address');
    if (form.password.length < 6) return setMessage('Password must be at least 6 characters');
    await login(form.email, form.password);
    navigate(location.state?.returnTo || (location.state?.from?.pathname || '/dashboard'));
  };

  return (
    <div className="container auth-container">
      <h1 className="h3 mb-3">Login</h1>
      {authMessage && <AlertMessage type="info">{authMessage}</AlertMessage>}
      <AlertMessage>{message || error}</AlertMessage>
      <form onSubmit={submit} className="card card-body shadow-sm">
        <label className="form-label">Email</label>
        <input className="form-control mb-3" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <label className="form-label">Password</label>
        <input className="form-control mb-3" type="password" required minLength="6" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="btn btn-warning" disabled={loading}>{loading ? 'Signing in...' : 'Login'}</button>
      </form>
      <p className="mt-3">New to ShopEZ? <Link to="/register">Create an account</Link></p>
    </div>
  );
};

export default Login;
