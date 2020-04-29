const { Router } = require('express');
const { exec } = require('child_process');
const { GravatarClient } = require('grav.client');
const { join } = require('path');
const CacheService = require('../../Services/cache.service');
const router = Router();
const BuildCalendarUseCase = require('../../Application/build-calendar.use-case');

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
    const privateKeyPath = join(__dirname, '../../_/rsa.private');
    const email = CacheService.get(user);
    exec(`echo ${ciphertext.trim()} | base64 -d | openssl rsautl -decrypt -inkey ${privateKeyPath}`,
      (err, password) => {
        if (err) throw err;
        const client = new GravatarClient(email.trim(), password.trim());
        const buildCalendar = new BuildCalendarUseCase();
        buildCalendar.client = client;
        buildCalendar.execute().then(calendar => {
          res.render("calendar", calendar);
        }).catch((err) => {
          console.log(err);
          res.end();
        });
      });
  }
})

module.exports = router;
