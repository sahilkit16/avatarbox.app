export function isAuthenticated(req, res, next) {
  if (!req.session.user) {
    res.statusCode = 302;
    res.setHeader("location", `/`);
    return res.end();
  }
  next();
}
