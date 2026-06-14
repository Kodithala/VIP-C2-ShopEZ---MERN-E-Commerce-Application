import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import api from '../../services/api.js';
import { formatINR } from '../../utils/currency.js';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const load = () => api.get('/orders').then(({ data }) => setOrders(data));

  useEffect(() => {
    load();
  }, []);

  const update = async (id, patch) => {
    await api.put(`/orders/${id}`, patch);
    load();
  };

  const remove = async (id) => {
    await api.delete(`/orders/${id}`);
    load();
  };

  return (
    <div className="container py-4">
      <h1 className="h2 mb-4">Order Management</h1>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead><tr><th>Customer</th><th>Total</th><th>Distance</th><th>Payment</th><th>Status</th><th>Date</th><th /></tr></thead>
          <tbody>{orders.map((order) => <tr key={order._id}><td>{order.userId?.name || 'Deleted user'}</td><td>{formatINR(order.totalAmount)}</td><td>{order.shippingAddress?.distanceKm ? `${order.shippingAddress.distanceKm} km` : '-'}</td><td><select className="form-select role-select" value={order.paymentStatus} onChange={(e) => update(order._id, { paymentStatus: e.target.value })}><option>PENDING</option><option>PAID</option><option>FAILED</option><option>REFUNDED</option></select></td><td><select className="form-select role-select" value={order.orderStatus} onChange={(e) => update(order._id, { orderStatus: e.target.value })}><option>PROCESSING</option><option>SHIPPED</option><option>DELIVERED</option><option>CANCELLED</option></select></td><td>{new Date(order.createdAt).toLocaleDateString()}</td><td className="text-end"><button className="btn btn-outline-danger btn-sm" onClick={() => remove(order._id)} title="Delete"><Trash2 size={16} /></button></td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
