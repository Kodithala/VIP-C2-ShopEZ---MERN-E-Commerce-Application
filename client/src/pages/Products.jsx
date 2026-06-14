import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import Loading from '../components/Loading.jsx';
import { useProducts } from '../context/ProductContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const categories = ['', 'Electronics', 'Fashion', 'Home', 'Books', 'Sports', 'Appliances', 'Beauty', 'Grocery'];

const Products = () => {
  const [params, setParams] = useSearchParams();
  const [keyword, setKeyword] = useState(params.get('keyword') || '');
  const category = params.get('category') || '';
  const { products, loading, fetchProducts, saveProduct } = useProducts();
  const { isAdmin } = useAuth();

  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', category: 'Electronics', brand: '', image: '', price: 0, stock: 0, rating: 0 });

  useEffect(() => {
    fetchProducts({ keyword: params.get('keyword') || undefined, category: category || undefined, limit: 24 });
  }, [params]);

  const submit = (e) => {
    e.preventDefault();
    setParams({ ...(keyword ? { keyword } : {}), ...(category ? { category } : {}) });
  };

  const submitNewProduct = async (e) => {
    e.preventDefault();
    try {
      await saveProduct({ ...newProduct, price: Number(newProduct.price), stock: Number(newProduct.stock), rating: Number(newProduct.rating) });
      setNewProduct({ name: '', description: '', category: 'Electronics', brand: '', image: '', price: 0, stock: 0, rating: 0 });
      setShowForm(false);
      fetchProducts({ keyword: params.get('keyword') || undefined, category: category || undefined, limit: 24 });
    } catch (err) {
      // ignore errors here; backend will enforce auth/validation
    }
  };

  return (
    <div className="container py-4">
      <div className="products-toolbar">
        <div>
          <span className="page-kicker">INR catalog</span>
          <h1 className="h2 mb-0">Products</h1>
        </div>
        {isAdmin && (
          <div className="ms-3">
            <button className="btn btn-outline-secondary me-2" type="button" onClick={() => setShowForm((s) => !s)}>{showForm ? 'Cancel' : 'Add Product'}</button>
          </div>
        )}
        <form className="products-search" onSubmit={submit}>
          <input className="form-control" placeholder="Search products" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
          <select className="form-select" value={category} onChange={(e) => setParams({ ...(keyword ? { keyword } : {}), ...(e.target.value ? { category: e.target.value } : {}) })}>
            {categories.map((item) => <option value={item} key={item}>{item || 'All Categories'}</option>)}
          </select>
          <button className="btn btn-dark">Search</button>
        </form>
      </div>
      {isAdmin && showForm && (
        <form className="card card-body mb-4" onSubmit={submitNewProduct}>
          <div className="row g-3">
            {['name', 'brand', 'image', 'price', 'stock', 'rating'].map((field) => (
              <div className="col-md-4" key={field}>
                <label className="form-label text-capitalize">{field}</label>
                <input className="form-control" required={field !== 'rating'} type={['price', 'stock', 'rating'].includes(field) ? 'number' : 'text'} value={newProduct[field]} onChange={(e) => setNewProduct({ ...newProduct, [field]: e.target.value })} />
              </div>
            ))}
            <div className="col-md-4">
              <label className="form-label">Category</label>
              <select className="form-select" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}>{['Electronics', 'Fashion', 'Home', 'Books', 'Sports', 'Appliances', 'Beauty', 'Grocery'].map((category) => <option key={category}>{category}</option>)}</select>
            </div>
            <div className="col-12">
              <label className="form-label">Description</label>
              <textarea className="form-control" required value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
            </div>
          </div>
          <button className="btn btn-warning mt-3">Create Product</button>
        </form>
      )}
      <div className="category-strip">
        {categories.filter(Boolean).map((item) => (
          <button className={`category-pill ${category === item ? 'active' : ''}`} type="button" key={item} onClick={() => setParams({ ...(keyword ? { keyword } : {}), category: item })}>{item}</button>
        ))}
      </div>
      {loading ? (
        <Loading />
      ) : products.length ? (
        <div className="row g-4">{products.map((product) => <div className="col-md-6 col-lg-3" key={product._id}><ProductCard product={product} /></div>)}</div>
      ) : (
        <div className="empty-state text-center py-5">No products available yet. Please check back later or try another search.</div>
      )}
    </div>
  );
};

export default Products;
