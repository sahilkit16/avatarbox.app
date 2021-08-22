import { redirect } from "next/dist/server/api-utils";

export function isAuthenticated(req, res, next) {
  if (!req.session.passport || !req.session.passport.user) {
    return redirect(res, "/");
  }
  next();
}
