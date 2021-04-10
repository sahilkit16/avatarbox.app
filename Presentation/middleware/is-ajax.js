export function isAjax(req, res, next) {
  req.isAjax =
    req.xhr ||
    /json/i.test(req.headers.accept) ||
    /json/i.test(req.headers["content-type"]);
  next();
}
