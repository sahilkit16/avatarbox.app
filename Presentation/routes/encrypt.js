const { Router } = require('express');
const router = Router();
const RsaService = require('../../Services/rsa.service');
const EncryptView = require('../view-models/encrypt');

router.post('/', async (req,res) => {
    const { password } = req.body;
    const ciphertext = await RsaService.encrypt(password);
    const model = new EncryptView();
    model.title = "Encrypt | Avatar Box";
    model.ciphertext = ciphertext;
    model.userid = req.session.userid;
    res.render("encrypt", model);
});

module.exports = router;
