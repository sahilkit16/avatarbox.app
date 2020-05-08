function _handleUnauthorized(req, res){
  req.session = {
    validationMessage: "Invalid email or password"
  };
  res.status(401);
  return res.redirect("/");
}

function unauthorized(req, res, next) {
  req.unauthorized = _handleUnauthorized.bind(null, req, res);
  next();
}

module.exports = {
  unauthorized,
  _handleUnauthorized
};
