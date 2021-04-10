const ShortId = require("shortid");
const LoginVM = require("../../view-models/login.vm");
const { container } = require("../../../Common/di-container");
const { withSession } = require("next-session");
import {
  use,
  isAjax,
  unauthorized,
  gravatarClientScope,
} from "../../middleware";
const { asValue } = require("awilix");

export default withSession(async (req, res) => {
  await use(req, res, [isAjax, unauthorized, gravatarClientScope]);

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
    const client = await avbx.login(user.email, password);

    if (!client) return req.unauthorized();

    user.hash = client.emailHash;
    user.cacheBuster = ShortId();
    user.lastUpdated = (await avbx.user.find(user.email)).lastUpdated;
    req.session.user = user;
    req.scope.register({
      gravatarClient: asValue(client),
    });

    if (req.isAjax) {
      return res.end();
    } else {
      return res.redirect("/calendar#");
    }
  } else {
    req.unauthorized();
  }
});
