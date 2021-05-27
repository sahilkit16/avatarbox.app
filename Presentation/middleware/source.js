import { use } from ".";
import { isAuthenticated } from "./is-authenticated";

export async function source(req, res, next) {
  req.source = req.session.passport.user.source;
  await use(req, res, [isAuthenticated]);
  if (req.source) next();
  if (req.session.passport.user.token) {
    req.source = "twitter";
  } else {
    req.source = "gravatar";
  }
  next();
}
