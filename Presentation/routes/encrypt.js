const { Router } = require("express");
const router = Router();
const EncryptView = require("../view-models/encrypt");
const { container } = require("../../Common/di-container");

router.post("/", async (req, res) => {
  const { password } = req.body;
  const rsaService = container.resolve("rsaService");
  const ciphertext = await rsaService.encrypt(password);
  const model = new EncryptView();
  model.title = "Encrypt | Avatar Box";
  model.ciphertext = ciphertext;
  model.userid = req.session.userid;
  res.render("encrypt", model);
});

module.exports = router;
