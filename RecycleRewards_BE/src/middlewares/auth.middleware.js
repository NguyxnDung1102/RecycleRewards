export const allowRoles = (...roles) => (req, res, next) => {
  const role = req.header('x-demo-role');
  if (!role || !roles.includes(role)) return res.status(403).json({ message: 'Bạn không có quyền thực hiện thao tác này.' });
  next();
};
