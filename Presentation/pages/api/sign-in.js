const ShortId = require("shortid");
const LoginVM = require("../../view-models/login.vm");
const { useMiddleware } = require("./use-middleware");
const container = require("../../../Common/di-container");
import { withSession } from "next-session";
const { asValue } = require("awilix");

export default withSession(async (req, res) => {
  await useMiddleware.call({ req, res });

  let { password } = req.body;
  const loginVm = new LoginVM();
  loginVm.email = req.session.email || req.body.email;
  loginVm.password = password;

  if (loginVm.errors.email) {
    return req.unauthorized(loginVm.errors.email, "/");
  } else if (!req.isAjax && loginVm.errors.password) {
    return req.unauthorized(loginVm.errors.password, "/?next=1#here");
  }

  const user = { email: loginVm.email };

  if (user.email && password) {
    const avbx = container.resolve("avbx");
    avbx
      .login(user.email, password)
      .then(async (client) => {
        user.hash = client.emailHash;
        user.cacheBuster = ShortId();
        user.lastUpdated = (await avbx.user.find(user.email)).lastUpdated;
        req.session.user = user;
        req.scope.register({
          gravatarClient: asValue(client),
        });
      })
      .then(() => {
        if (req.isAjax) {
          res.end();
        } else {
          res.redirect("/calendar#");
        }
      })
      .catch((err) => {
        console.log(err);
        req.unauthorized();
      });
  } else {
    req.unauthorized();
  }
});
