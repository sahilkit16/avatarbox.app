import { redirect } from "next/dist/next-server/server/api-utils";

export function isAuthenticated(req, res, next) {
  if (!req.session.user && !req.session.passport.user) {
    return redirect(res, "/");
  }
  next();
}
