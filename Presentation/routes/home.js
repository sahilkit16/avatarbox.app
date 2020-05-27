const { Router } = require("express");
const { asValue } = require("awilix");
const container = require("../../Common/di-container");
const router = Router();
const gravatarClientScope = require("../middleware/gravatar-client-scope");
const { unauthorized } = require("../middleware/unauthorized");
const { GravatarClient } = require("grav.client");
const LoginVM = require("../view-models/login.vm");

const cacheService = container.resolve("cacheService");

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

// TODO: cleanup + refactor
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

  const rsaService = container.resolve("rsaService");

  if (req.isAjax) {
    password = await rsaService.decrypt(password);
  }

  const user = { email: loginVm.email };

  if (user.email && password) {
    const client = new GravatarClient(user.email, password);
    client
      .test()
      .then(async (response) => {
        if (!!response) {
          user.password = req.isAjax
            ? req.body.password
            : await rsaService.encrypt(password);
          user.hash = client.emailHash;
          cacheService.touchSession(user.hash);
          req.session.user = user;
          req.scope.register({
            gravatarClient: asValue(client),
          });
        } else {
          console.log("Gravatar ping failed");
        }
      })
      .then(() => {
        const userService = container.resolve("userService");
        userService
          .findOrCreate(user.email, user.password)
          .then((usr) => {
            req.session.isNewUser = usr.isNew;
            if (req.isAjax) {
              res.end();
            } else {
              res.redirect("/calendar#");
            }
          })
          .catch((err) => req.unauthorized());
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
