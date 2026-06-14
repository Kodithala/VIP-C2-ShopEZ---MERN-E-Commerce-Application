import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AlertMessage from '../components/AlertMessage.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const authMessage = location.state?.message || '';

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return setMessage('Name is required');
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setMessage('Enter a valid email address');
    if (form.password.length < 6) return setMessage('Password must be at least 6 characters');
    await register(form);
    navigate(location.state?.returnTo || '/dashboard');
  };

  return (
    <div className="container auth-container">
      <h1 className="h3 mb-3">Register</h1>
      {authMessage && <AlertMessage type="info">{authMessage}</AlertMessage>}
      <AlertMessage>{message || error}</AlertMessage>
      <form onSubmit={submit} className="card card-body shadow-sm">
        <label className="form-label">Name</label>
        <input className="form-control mb-3" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <label className="form-label">Email</label>
        <input className="form-control mb-3" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <label className="form-label">Password</label>
        <input className="form-control mb-3" type="password" required minLength="6" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="btn btn-warning" disabled={loading}>{loading ? 'Creating...' : 'Create Account'}</button>
      </form>
      <p className="mt-3">Already registered? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Register;
