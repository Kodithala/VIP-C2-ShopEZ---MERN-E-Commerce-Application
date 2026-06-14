import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import AppNavbar from './components/AppNavbar.jsx';
import Footer from './components/Footer.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import AdminRoute from './routes/AdminRoute.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Products from './pages/Products.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import UserDashboard from './pages/UserDashboard.jsx';
import Profile from './pages/Profile.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Orders from './pages/Orders.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import ProductManagement from './pages/admin/ProductManagement.jsx';
import UserManagement from './pages/admin/UserManagement.jsx';
import OrderManagement from './pages/admin/OrderManagement.jsx';
import NotFound from './pages/NotFound.jsx';

const RootLayout = () => (
  <>
    <AppNavbar />
    <main className="page-shell">
      <Outlet />
    </main>
    <Footer />
  </>
);

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'products', element: <Products /> },
        { path: 'products/:id', element: <ProductDetails /> },
        { path: 'about', element: <About /> },
        { path: 'contact', element: <Contact /> },
        { path: 'cart', element: <Cart /> },
        { path: 'checkout', element: <Checkout /> },
        {
          element: <ProtectedRoute />,
          children: [
            { path: 'dashboard', element: <UserDashboard /> },
            { path: 'profile', element: <Profile /> },
            { path: 'orders', element: <Orders /> }
          ]
        },
        {
          element: <AdminRoute />,
          children: [
            { path: 'admin/dashboard', element: <AdminDashboard /> },
            { path: 'admin/products', element: <ProductManagement /> },
            { path: 'admin/users', element: <UserManagement /> },
            { path: 'admin/orders', element: <OrderManagement /> }
          ]
        },
        { path: '*', element: <NotFound /> }
      ]
    }
  ],
  { future: { v7_startTransition: true, v7_relativeSplatPath: true } }
);

const App = () => <RouterProvider router={router} />;

export default App;
