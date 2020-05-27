function isAjax(req, res, next) {
  req.isAjax =
    req.xhr || /json/i.test(req.headers.accept) || req.is("application/json");
  next();
}

module.exports = isAjax;
