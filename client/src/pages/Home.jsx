import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import Loading from '../components/Loading.jsx';
import { useProducts } from '../context/ProductContext.jsx';

const categories = [
  { name: 'Electronics', text: 'Phones, audio, laptops' },
  { name: 'Fashion', text: 'Daily wear and accessories' },
  { name: 'Home', text: 'Comforts for every room' },
  { name: 'Books', text: 'Reads worth keeping' },
  { name: 'Sports', text: 'Training and outdoor gear' },
  { name: 'Appliances', text: 'Daily home machines' },
  { name: 'Beauty', text: 'Care and grooming' },
  { name: 'Grocery', text: 'Kitchen essentials' }
];

const Home = () => {
  const { products, loading, fetchProducts } = useProducts();

  useEffect(() => {
    fetchProducts({ limit: 8 });
  }, []);

  return (
    <>
      <section className="hero-band">
        <div className="container py-5">
          <div className="row align-items-center g-4">
            <div className="col-lg-7 hero-copy">
              <span className="hero-kicker">India-ready ecommerce</span>
              <h1 className="display-5 fw-bold">ShopEZ</h1>
              <p className="lead mb-4">Browse INR-priced essentials across electronics, fashion, home, books, sports, appliances, beauty, and groceries with delivery limited to 15 km around the service station.</p>
              <div className="hero-actions">
                <Link className="btn btn-warning btn-lg" to="/products">Shop Products</Link>
                <span className="delivery-note">15 km local delivery radius</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container py-5">
        <div className="section-heading">
          <h2 className="h3 mb-0">Featured Products</h2>
          <Link to="/products" className="btn btn-outline-dark btn-sm">All Products</Link>
        </div>
        {loading ? (
          <Loading />
        ) : products.length ? (
          <div className="row g-4">{products.slice(0, 4).map((p) => <div className="col-md-6 col-lg-3" key={p._id}><ProductCard product={p} /></div>)}</div>
        ) : (
          <div className="empty-state text-center py-5">No products available yet. Please check back later.</div>
        )}
      </section>
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="h3 mb-3">Categories</h2>
          <div className="row g-3">
            {categories.map((category) => (
              <div className="col-12 col-sm-6 col-lg-3" key={category.name}>
                <Link to={`/products?category=${category.name}`} className="category-tile">
                  <span>{category.name}</span>
                  <small>{category.text}</small>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="container py-5">
        <h2 className="h3 mb-3">Latest Products</h2>
        <div className="row g-4">{products.slice(4, 8).map((p) => <div className="col-md-6 col-lg-3" key={p._id}><ProductCard product={p} /></div>)}</div>
      </section>
    </>
  );
};

export default Home;
