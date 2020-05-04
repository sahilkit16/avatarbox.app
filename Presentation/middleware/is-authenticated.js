function isAuthenticated(req, res, next){
  if (!req.session.user) {
    return res.redirect("/");
  }
  next();
}

module.exports = isAuthenticated;