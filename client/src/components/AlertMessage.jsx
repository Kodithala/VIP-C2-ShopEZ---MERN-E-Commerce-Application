const AlertMessage = ({ type = 'danger', children }) => {
  if (!children) return null;
  return <div className={`alert alert-${type}`}>{children}</div>;
};

export default AlertMessage;
