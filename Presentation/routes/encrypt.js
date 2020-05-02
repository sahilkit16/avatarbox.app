const { Router } = require('express');
const router = Router();
const RsaService = require('../../Services/rsa.service');
const EncryptView = require('../view-models/encrypt');

router.post('/', async (req,res) => {
    const { password } = req.body;
    const ciphertext = await RsaService.encrypt(password);
    const model = new EncryptView();
    res.render("encrypt", Object.assign(model, { 
      title: "Encrypt | Avatar Box",
      ciphertext,
    }));
});

module.exports = router;
