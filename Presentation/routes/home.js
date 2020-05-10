const { Router } = require("express");
const { asValue } = require("awilix");
const { container } = require("../../Common/di-container");
const router = Router();
const gravatarClientScope = require("../middleware/gravatar-client-scope");
const { unauthorized } = require("../middleware/unauthorized");
const { GravatarClient } = require("grav.client");

router.use(unauthorized);
router.use(gravatarClientScope);

router.post("/get-started", async (req, res) => {
  req.session = {};
  const client = req.scope.resolve("gravatarClient");
  const { email } = req.body;
  let redirectUrl = "/";
  if (client) {
    const userid = client.emailHash;
    req.session.userid = userid;
    req.session.email = email;
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
  const email = req.session.email || req.body.email;
  const rsaService = container.resolve("rsaService");
  const isAjax = req.is("application/json");
  if (isAjax) {
    password = await rsaService.decrypt(password);
  }
  const user = { email };
  if (email && password) {
    const client = new GravatarClient(email, password);
    client
      .test()
      .then(async (response) => {
        if (!!response) {
          user.password = isAjax
            ? req.body.password
            : await rsaService.encrypt(password);
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
            if (isAjax) {
              res.end();
            } else {
              res.redirect("/calendar");
            }
          })
          .catch(req.unauthorized);
      })
      .catch(req.unauthorized);
  } else {
    req.unauthorized();
  }
});

router.get("/sign-out", (req, res) => {
  req.session = null;
  res.redirect("/");
});

module.exports = router;
