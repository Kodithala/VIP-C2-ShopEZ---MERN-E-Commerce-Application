import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const UserDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container py-4">
      <h1 className="h2">Dashboard</h1>
      <p className="lead">Welcome back, {user.name}.</p>
      <div className="row g-3">
        <div className="col-md-4"><Link className="dashboard-link" to="/products">Browse Products</Link></div>
        <div className="col-md-4"><Link className="dashboard-link" to="/cart">Review Cart</Link></div>
        <div className="col-md-4"><Link className="dashboard-link" to="/orders">Order History</Link></div>
      </div>
    </div>
  );
};

export default UserDashboard;
