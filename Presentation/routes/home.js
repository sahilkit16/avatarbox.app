const { Router } = require("express");
const router = Router();
const RouteOptions = require('./_routeOptions');

module.exports = function calendarRoute(options = new RouteOptions.Home()){
  router.post("/get-started", (req, res) => {
    const { email, isProgressive } = req.body;
    let client,
      redirectUrl = "/";
    if (email) {
      client = options.useGravatarClient(email, null);
      const userid = client.emailHash;
      req.session.userid = userid;
      options.cache.set(userid, email);
      redirectUrl += `?next=1`;
    }
    if (isProgressive) {
      redirectUrl += "#here";
    }
    res.redirect(redirectUrl);
  });
  
  router.post("/sign-in", async (req, res) => {
    const { isProgressive, ciphertext } = req.body;
    const { userid } = req.session;
    if (userid && ciphertext) {
      const email = options.cache.get(userid);
      req.session.user = { email, password: ciphertext };
      options.user.create(email, ciphertext)
        .then(() => {
          res.redirect("/calendar");
        })
        .catch((err) => {
          console.log(err);
          res.end();
        });
    }
  });
  
  router.get("/sign-out", (req, res) => {
    req.session.userid = null;
    req.session.user = null;
    res.redirect("/");
  });
  
  return router;
}
