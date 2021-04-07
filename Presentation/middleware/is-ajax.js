function isAjax(req, res, next) {
  req.isAjax = req.xhr || /json/i.test(req.headers.accept);
  next();
}

module.exports = isAjax;
