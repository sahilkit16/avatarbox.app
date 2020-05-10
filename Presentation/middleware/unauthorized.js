function _handleUnauthorized(req, res) {
  const message = "Invalid email or password";
  if (req.is("application/json")) {
    res.status(401);
    return res.send(message);
  }
  req.session.validationMessage = message;
  return res.redirect("/");
}

function unauthorized(req, res, next) {
  req.unauthorized = _handleUnauthorized.bind(null, req, res);
  next();
}

module.exports = {
  unauthorized,
  _handleUnauthorized,
};
