const LoginVM = require("../../view-models/login.vm");
const { useMiddleware } = require("./use-middleware");
import { withSession } from "next-session";

export default withSession(async (req, res) => {
  await useMiddleware.call({ req, res });
  const loginVm = new LoginVM();
  loginVm.email = req.body.email;

  if (loginVm.errors.email) {
    return req.unauthorized(loginVm.errors.email);
  }

  let redirectUrl = "/";
  const client = req.scope.resolve("gravatarClient");
  if (client) {
    const userid = client.emailHash;
    req.session.userid = userid;
    req.session.email = loginVm.email;
    redirectUrl += `?next=1`;
  }
  if (!req.isAjax) {
    redirectUrl += "#here";
    res.redirect(redirectUrl);
  } else {
    res.end();
  }
});
