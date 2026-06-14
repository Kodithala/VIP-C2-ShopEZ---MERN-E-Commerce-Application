import { useEffect, useMemo, useState } from 'react';
import { Check, Pencil, Search, ShieldCheck, Trash2, UserPlus, Users } from 'lucide-react';
import AlertMessage from '../../components/AlertMessage.jsx';
import Loading from '../../components/Loading.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import api from '../../services/api.js';

const emptyForm = { name: '', email: '', password: '', role: 'USER' };

const UserManagement = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const load = async () => {
    const { data } = await api.get('/users');
    setUsers(data);
  };

  useEffect(() => {
    load()
      .catch((err) => setError(err.response?.data?.message || 'Unable to load users'))
      .finally(() => setLoading(false));
  }, []);

  const filteredUsers = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return users;

    return users.filter((item) =>
      [item.name, item.email, item.role].some((value) => value?.toLowerCase().includes(term))
    );
  }, [search, users]);

  const totals = useMemo(
    () => ({
      all: users.length,
      admins: users.filter((item) => item.role === 'ADMIN').length,
      customers: users.filter((item) => item.role === 'USER').length
    }),
    [users]
  );

  const resetFeedback = () => {
    setMessage('');
    setError('');
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    resetFeedback();
    setSaving(true);
    try {
      await api.post('/users', form);
      setForm(emptyForm);
      await load();
      setMessage('User created successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to create user');
    } finally {
      setSaving(false);
    }
  };

  const beginEdit = (selectedUser) => {
    resetFeedback();
    setEditingId(selectedUser._id);
    setEditingUser({ name: selectedUser.name, email: selectedUser.email, role: selectedUser.role });
  };

  const cancelEdit = () => {
    setEditingId('');
    setEditingUser(null);
  };

  const saveEdit = async (id) => {
    resetFeedback();
    setSaving(true);
    try {
      await api.put(`/users/${id}`, editingUser);
      await load();
      cancelEdit();
      setMessage('User updated successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to update user');
    } finally {
      setSaving(false);
    }
  };

  const updateRole = async (id, role) => {
    resetFeedback();
    try {
      await api.put(`/users/${id}`, { role });
      await load();
      setMessage('Role updated successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to update role');
    }
  };

  const remove = async (id) => {
    resetFeedback();
    if (!window.confirm('Delete this user account?')) return;

    try {
      await api.delete(`/users/${id}`);
      await load();
      setMessage('User deleted successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to delete user');
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="container py-4 admin-users">
      <div className="section-heading">
        <div>
          <h1 className="h2 mb-1">User Dashboard</h1>
          <p className="text-muted mb-0">Create accounts, assign admins, edit profiles, and remove inactive users.</p>
        </div>
      </div>

      {message && <AlertMessage type="success">{message}</AlertMessage>}
      {error && <AlertMessage type="danger">{error}</AlertMessage>}

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="stat-card admin-user-stat">
            <Users size={22} />
            <span>Total Users</span>
            <strong>{totals.all}</strong>
          </div>
        </div>
        <div className="col-md-4">
          <div className="stat-card admin-user-stat">
            <ShieldCheck size={22} />
            <span>Admins</span>
            <strong>{totals.admins}</strong>
          </div>
        </div>
        <div className="col-md-4">
          <div className="stat-card admin-user-stat">
            <Check size={22} />
            <span>Customers</span>
            <strong>{totals.customers}</strong>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-4">
          <div className="card card-body">
            <h2 className="h5 mb-3">Create User</h2>
            <form onSubmit={handleCreate} className="vstack gap-3">
              <div>
                <label className="form-label" htmlFor="admin-user-name">Name</label>
                <input
                  id="admin-user-name"
                  className="form-control"
                  value={form.name}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="form-label" htmlFor="admin-user-email">Email</label>
                <input
                  id="admin-user-email"
                  className="form-control"
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="form-label" htmlFor="admin-user-password">Password</label>
                <input
                  id="admin-user-password"
                  className="form-control"
                  type="password"
                  minLength="6"
                  value={form.password}
                  onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="form-label" htmlFor="admin-user-role">Role</label>
                <select
                  id="admin-user-role"
                  className="form-select"
                  value={form.role}
                  onChange={(event) => setForm((prev) => ({ ...prev, role: event.target.value }))}
                >
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
              <button className="btn btn-warning d-inline-flex align-items-center justify-content-center gap-2" disabled={saving}>
                <UserPlus size={18} />
                {saving ? 'Saving...' : 'Create User'}
              </button>
            </form>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card card-body">
            <div className="admin-table-toolbar">
              <h2 className="h5 mb-0">Users</h2>
              <div className="admin-search">
                <Search size={17} />
                <input
                  className="form-control"
                  placeholder="Search users"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>
            </div>

            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Created</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((item) => {
                    const isSelf = item._id === currentUser?._id;
                    const isEditing = editingId === item._id;

                    return (
                      <tr key={item._id}>
                        <td>
                          {isEditing ? (
                            <input
                              className="form-control form-control-sm"
                              value={editingUser.name}
                              onChange={(event) => setEditingUser((prev) => ({ ...prev, name: event.target.value }))}
                            />
                          ) : (
                            <strong>{item.name}</strong>
                          )}
                        </td>
                        <td>
                          {isEditing ? (
                            <input
                              className="form-control form-control-sm"
                              type="email"
                              value={editingUser.email}
                              onChange={(event) => setEditingUser((prev) => ({ ...prev, email: event.target.value }))}
                            />
                          ) : (
                            item.email
                          )}
                        </td>
                        <td>
                          <select
                            className="form-select form-select-sm role-select"
                            value={isEditing ? editingUser.role : item.role}
                            disabled={isSelf && item.role === 'ADMIN'}
                            onChange={(event) =>
                              isEditing
                                ? setEditingUser((prev) => ({ ...prev, role: event.target.value }))
                                : updateRole(item._id, event.target.value)
                            }
                          >
                            <option value="USER">User</option>
                            <option value="ADMIN">Admin</option>
                          </select>
                        </td>
                        <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                        <td className="text-end">
                          {isEditing ? (
                            <div className="btn-group btn-group-sm">
                              <button className="btn btn-warning" onClick={() => saveEdit(item._id)} title="Save" disabled={saving}>
                                <Check size={16} />
                              </button>
                              <button className="btn btn-outline-secondary" onClick={cancelEdit}>Cancel</button>
                            </div>
                          ) : (
                            <div className="btn-group btn-group-sm">
                              <button className="btn btn-outline-secondary" onClick={() => beginEdit(item)} title="Edit">
                                <Pencil size={16} />
                              </button>
                              <button
                                className="btn btn-outline-danger"
                                onClick={() => remove(item._id)}
                                title="Delete"
                                disabled={isSelf}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {!filteredUsers.length && (
                    <tr>
                      <td colSpan="5" className="text-center text-muted py-4">No users found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
