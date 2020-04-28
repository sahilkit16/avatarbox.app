const { Router } = require('express');
const { exec } = require('child_process');
const router = Router();

router.post('/', (req,res) => {
    const { password } = req.body;
    exec(`echo ${password} | openssl rsautl -encrypt -inkey rsa.public -pubin | base64 -w 0`,
    (err, stdout) => {
        if(err) throw err;
        const ciphertext = stdout.trim();
        res.render("ciphertext", { ciphertext });
    });
});

module.exports = router;
