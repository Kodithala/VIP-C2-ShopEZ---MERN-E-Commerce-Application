import { useEffect, useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { useProducts } from '../../context/ProductContext.jsx';
import { formatINR } from '../../utils/currency.js';

const empty = { name: '', description: '', category: 'Electronics', brand: '', image: '', price: 0, stock: 0, rating: 0 };
const categories = ['Electronics', 'Fashion', 'Home', 'Books', 'Sports', 'Appliances', 'Beauty', 'Grocery'];

const ProductManagement = () => {
  const { products, fetchProducts, saveProduct, deleteProduct } = useProducts();
  const [form, setForm] = useState(empty);

  useEffect(() => {
    fetchProducts({ limit: 100 });
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await saveProduct({ ...form, price: Number(form.price), stock: Number(form.stock), rating: Number(form.rating) });
    setForm(empty);
    fetchProducts({ limit: 100 });
  };

  const remove = async (id) => {
    await deleteProduct(id);
    fetchProducts({ limit: 100 });
  };

  return (
    <div className="container py-4">
      <h1 className="h2 mb-4">Product Management</h1>
      <form className="card card-body mb-4" onSubmit={submit}>
        <div className="row g-3">
          {['name', 'brand', 'image', 'price', 'stock', 'rating'].map((field) => (
            <div className="col-md-4" key={field}>
              <label className="form-label text-capitalize">{field}</label>
              <input className="form-control" required={field !== 'rating'} type={['price', 'stock', 'rating'].includes(field) ? 'number' : 'text'} value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })} />
            </div>
          ))}
          <div className="col-md-4">
            <label className="form-label">Category</label>
            <select className="form-select" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>{categories.map((category) => <option key={category}>{category}</option>)}</select>
          </div>
          <div className="col-12">
            <label className="form-label">Description</label>
            <textarea className="form-control" required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
        </div>
        <button className="btn btn-warning mt-3">{form._id ? 'Update Product' : 'Create Product'}</button>
      </form>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead><tr><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th /></tr></thead>
          <tbody>{products.map((product) => <tr key={product._id}><td>{product.name}</td><td>{product.category}</td><td>{formatINR(product.price)}</td><td>{product.stock}</td><td className="text-end"><button className="btn btn-outline-dark btn-sm me-2" onClick={() => setForm(product)} title="Edit"><Pencil size={16} /></button><button className="btn btn-outline-danger btn-sm" onClick={() => remove(product._id)} title="Delete"><Trash2 size={16} /></button></td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
