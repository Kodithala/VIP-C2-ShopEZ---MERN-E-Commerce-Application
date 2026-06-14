import { useState } from 'react';
import AlertMessage from '../components/AlertMessage.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({ name: user.name, email: user.email, password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await updateProfile({ ...form, password: form.password || undefined });
      setMessage('Profile updated');
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="container auth-container">
      <h1 className="h2 mb-3">Profile</h1>
      <AlertMessage type="success">{message}</AlertMessage>
      <AlertMessage>{error}</AlertMessage>
      <form className="card card-body shadow-sm" onSubmit={submit}>
        <label className="form-label">Name</label>
        <input className="form-control mb-3" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <label className="form-label">Email</label>
        <input className="form-control mb-3" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <label className="form-label">New Password</label>
        <input className="form-control mb-3" type="password" minLength="6" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="btn btn-warning">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
