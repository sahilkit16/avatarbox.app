const { Router } = require("express");
const router = Router();
const EncryptView = require("../view-models/encrypt");
const RouteOptions = require('./_routeOptions');

module.exports = function encryptRoute(options = new RouteOptions.Encrypt()){
  router.post("/", async (req, res) => {
    const { password } = req.body;
    const ciphertext = await options.rsa.encrypt(password);
    const model = new EncryptView();
    model.title = "Encrypt | Avatar Box";
    model.ciphertext = ciphertext;
    model.userid = req.session.userid;
    res.render("encrypt", model);
  });
  return router;
};
