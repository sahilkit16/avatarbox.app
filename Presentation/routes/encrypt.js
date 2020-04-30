const { Router } = require('express');
const router = Router();
const RsaService = require('../../Services/rsa.service');

router.post('/', async (req,res) => {
    const { password } = req.body;
    const ciphertext = await RsaService.encrypt(password);
    res.render("ciphertext", { ciphertext });
});

module.exports = router;
