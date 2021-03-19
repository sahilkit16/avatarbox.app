const { Router } = require("express");
const { asValue } = require("awilix");
const container = require("../../Common/di-container");
const router = Router();
const gravatarClientScope = require("../middleware/gravatar-client-scope");
const { unauthorized } = require("../middleware/unauthorized");
const LoginVM = require("../view-models/login.vm");
const ShortId = require("shortid");

router.use(unauthorized);
router.use(gravatarClientScope);

router.post("/get-started", async (req, res) => {
  req.session = {};

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
  if (req.is("application/x-www-form-urlencoded")) {
    redirectUrl += "#here";
    res.redirect(redirectUrl);
  } else {
    res.end();
  }
});

router.post("/sign-in", async (req, res) => {
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
      .catch((err) => req.unauthorized());
  } else {
    req.unauthorized();
  }
});

router.get("/sign-out", (req, res) => {
  req.session = null;
  res.redirect("/");
});

module.exports = router;
