import { redirect } from "next/dist/server/api-utils";

export function _handleUnauthorized(
  req,
  res,
  message = "Invalid email or password",
  path = "/"
) {
  if (req.isAjax) {
    res.status(401);
    return res.send(message);
  }
  req.session.validationMessage = message;
  return redirect(res, path);
}

const scopeUnauthorizedHandler = (req, res) => (message, path) => {
  return _handleUnauthorized(req, res, message, path);
};

export function unauthorized(req, res, next) {
  req.unauthorized = scopeUnauthorizedHandler(req, res);
  next();
}
