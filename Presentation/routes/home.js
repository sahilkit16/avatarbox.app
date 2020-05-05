const { Router } = require("express");
const { container } = require("../../Common/di-container");
const router = Router();
const gravatarClientScope = require("../middleware/gravatar-client-scope");

router.use(gravatarClientScope);

router.post("/get-started", (req, res) => {
  const client = req.scope.resolve("gravatarClient");
  const cacheService = container.resolve("cacheService");
  const { email, isProgressive } = req.body;
  let redirectUrl = "/";
  if (client) {
    const userid = client.emailHash;
    req.session.userid = userid;
    cacheService.set(userid, email);
    redirectUrl += `?next=1`;
  }
  if (isProgressive) {
    redirectUrl += "#here";
  }
  res.redirect(redirectUrl);
});

router.post("/sign-in", async (req, res) => {
  const cacheService = container.resolve("cacheService");
  const userService = container.resolve("userService");
  const { isProgressive, ciphertext } = req.body;
  const { userid } = req.session;
  if (userid && ciphertext) {
    const email = cacheService.get(userid);
    req.session.user = { email, password: ciphertext };
    userService
      .create(email, ciphertext)
      .then((user) => {
        if (user.isNew) {
          req.session.isNewUser = true;
        }
        res.redirect("/calendar");
      })
      .catch((err) => {
        console.log(err);
        res.end();
      });
  }
});

router.get("/sign-out", (req, res) => {
  req.session = null;
  res.redirect("/");
});

module.exports = router;
