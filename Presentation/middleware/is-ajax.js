function isAjax(req, res, next) {
  req.isAjax = req.is("application/json");
  next();
}

module.exports = isAjax;
