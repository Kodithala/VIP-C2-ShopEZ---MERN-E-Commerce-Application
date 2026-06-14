import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';

const AppNavbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          ShopEZ
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/products">Products</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/about">About</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contact">Contact</NavLink></li>
            {user && <li className="nav-item"><NavLink className="nav-link" to="/orders">Orders</NavLink></li>}
            {isAdmin && (
              <>
                <li className="nav-item"><NavLink className="nav-link" to="/admin/dashboard">Dashboard</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/admin/products">Manage Products</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/admin/users">Manage Users</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/admin/orders">Manage Orders</NavLink></li>
              </>
            )}
          </ul>
          <div className="d-flex align-items-center gap-2">
            <NavLink className="btn btn-outline-light btn-sm position-relative" to="/cart" title="Cart">
              <ShoppingCart size={17} />
              {count > 0 && <span className="badge text-bg-warning ms-1">{count}</span>}
            </NavLink>
            {user ? (
              <>
                <NavLink className="btn btn-outline-light btn-sm" to="/profile" title="Profile"><User size={17} /></NavLink>
                <button className="btn btn-warning btn-sm" onClick={handleLogout} title="Logout"><LogOut size={17} /></button>
              </>
            ) : (
              <>
                <NavLink className="btn btn-outline-light btn-sm" to="/login">Login</NavLink>
                <NavLink className="btn btn-warning btn-sm" to="/register">Register</NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
