export const admin = (req, res, next) => {
  if (req.user?.role === 'ADMIN') {
    return next();
  }

  res.status(403);
  next(new Error('Admin access required'));
};
