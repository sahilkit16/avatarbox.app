const { Router } = require('express');
const { exec } = require('child_process');
const { GravatarClient } = require('grav.client');
const { join } = require('path');
const CacheService = require('../../Services/cache.service');
const router = Router();

router.post('/get-started', (req, res) => {
  const { email, isProgressive } = req.body;
  let client, redirectUrl = "/";
  if (email) {
    client = new GravatarClient(email, null);
    redirectUrl += `?user=${client.emailHash}`;
    CacheService.set(client.emailHash, email);
  }
  if (isProgressive) {
    redirectUrl += "#hero";
  }
  res.redirect(redirectUrl);
})

router.post('/submit', (req, res) => {
  const { user, isProgressive, ciphertext } = req.body;
  if (ciphertext && user) {
    const path = join(__dirname, '../../_/rsa.private');
    const email = CacheService.get(user);
    exec(`echo ${ciphertext.trim()} | base64 -d | openssl rsautl -decrypt -inkey ${path}`,
      (err, password) => {
        if (err) throw err;
        const client = new GravatarClient(email.trim(), password.trim());
        client.userImages().then(result => {
          if(result.DidFail) throw result.ErrorMessage;
          return result;
        }).then(result => {
          res.render("dashboard", { images: result.Value.userImages });
        }).catch((err) => {
          console.log(err);
          res.end();
        });
      });
  }
})

module.exports = router;
