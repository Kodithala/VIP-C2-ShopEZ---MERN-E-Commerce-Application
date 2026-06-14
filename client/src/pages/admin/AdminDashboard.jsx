import { useEffect, useState } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ArcElement,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip
} from 'chart.js';
import Loading from '../../components/Loading.jsx';
import api from '../../services/api.js';
import { formatINR } from '../../utils/currency.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Tooltip, Legend);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/analytics/dashboard').then(({ data }) => setStats(data));
  }, []);

  if (!stats) return <Loading />;

  const chartData = (items, label) => ({
    labels: items.map((item) => item.label),
    datasets: [{ label, data: items.map((item) => item.value), backgroundColor: ['#f6c343', '#1f2937', '#0d6efd', '#198754', '#dc3545'], borderColor: '#1f2937' }]
  });

  return (
    <div className="container py-4">
      <h1 className="h2 mb-4">Admin Dashboard</h1>
      <div className="row g-3 mb-4">
        <div className="col-md-3"><div className="stat-card"><span>Total Users</span><strong>{stats.cards.totalUsers}</strong></div></div>
        <div className="col-md-3"><div className="stat-card"><span>Total Products</span><strong>{stats.cards.totalProducts}</strong></div></div>
        <div className="col-md-3"><div className="stat-card"><span>Total Orders</span><strong>{stats.cards.totalOrders}</strong></div></div>
        <div className="col-md-3"><div className="stat-card"><span>Revenue</span><strong>{formatINR(stats.cards.revenue)}</strong></div></div>
      </div>
      <div className="row g-4">
        <div className="col-lg-8"><div className="card card-body"><h2 className="h5">Sales Chart</h2><Line data={chartData(stats.charts.sales, 'Revenue')} /></div></div>
        <div className="col-lg-4"><div className="card card-body"><h2 className="h5">Product Category Chart</h2><Doughnut data={chartData(stats.charts.categories, 'Products')} /></div></div>
        <div className="col-lg-12"><div className="card card-body"><h2 className="h5">Orders Chart</h2><Bar data={chartData(stats.charts.orders, 'Orders')} /></div></div>
      </div>
    </div>
  );
};

export default AdminDashboard;
