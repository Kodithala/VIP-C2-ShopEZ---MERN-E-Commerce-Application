import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="container py-5 text-center">
    <h1 className="h2">Page not found</h1>
    <Link className="btn btn-warning mt-3" to="/">Go Home</Link>
  </div>
);

export default NotFound;
