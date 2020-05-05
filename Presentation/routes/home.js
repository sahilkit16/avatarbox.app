const { Router } = require("express");
const { container } = require("../../Common/di-container");
const router = Router();
const gravatarClientScope = require("../middleware/gravatar-client-scope");

router.use(gravatarClientScope);

router.post("/get-started", async (req, res) => {
  const client = req.scope.resolve("gravatarClient");
  const { email } = req.body;
  let redirectUrl = "/";
  if (client) {
    const userid = client.emailHash;
    req.session.userid = userid;
    req.session.email = email;
    redirectUrl += `?next=1`;
  }
  if(req.is('application/x-www-form-urlencoded')){
    redirectUrl += "#here";
    res.redirect(redirectUrl);
  } else {
    res.end();
  }
});

router.post("/sign-in", async (req, res) => {
  const userService = container.resolve("userService");
  const { ciphertext } = req.body;
  const { userid, email } = req.session;
  if (userid && ciphertext) {
    req.session.user = { email, password: ciphertext };
    userService
      .create(email, ciphertext)
      .then((user) => {
        req.session.isNewUser = user.isNew;
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
