export async function source(req, res, next) {
  if(!req.session || !req.session.passport) return next();
  req.source = "gravatar";
  if (req.session.passport.user.token) {
    req.source = "twitter";
  }
  next();
}
