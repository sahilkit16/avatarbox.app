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
  const { ciphertext } = req.body;
  const { userid, email } = req.session;
  if (userid && email && ciphertext) {
    const rsaService = container.resolve("rsaService");
    rsaService.decrypt(ciphertext).then(password => {
      return new GravatarClient(email, password);
    })
    .then(async client => {
      const { response } = await client.test();
      if(!!response){
        req.session.user = { email, password: ciphertext };
        req.scope.register({
          gravatarClient: asValue(client),
        });
      } else {
        console.log('Gravatar ping failed');
      }
    })
    .then(() => {
      const userService = container.resolve("userService");
      userService
      .findOrCreate(email, ciphertext)
      .then((user) => {
        req.session.isNewUser = user.isNew;
        res.redirect("/calendar");
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
