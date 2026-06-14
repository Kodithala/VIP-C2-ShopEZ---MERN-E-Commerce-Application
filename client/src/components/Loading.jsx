const Loading = ({ label = 'Loading...' }) => (
  <div className="d-flex justify-content-center py-5">
    <div className="spinner-border text-warning" role="status" aria-label={label} />
  </div>
);

export default Loading;
