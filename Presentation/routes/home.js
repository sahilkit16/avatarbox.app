const { Router } = require('express');
const { GravatarClient } = require('grav.client');
const CacheService = require('../../Services/cache.service');
const RsaService = require('../../Services/rsa.service');
const BuildCalendarUseCase = require('../../Application/build-calendar.use-case');

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

router.post('/connect', async (req, res) => {
  const { user, isProgressive, ciphertext } = req.body;
  if (ciphertext && user) {
    const email = CacheService.get(user);
    const password = await RsaService.decrypt(ciphertext);
    const client = new GravatarClient(email, password);
    const buildCalendar = new BuildCalendarUseCase();
    buildCalendar.client = client;
    buildCalendar.execute().then(calendar => {
      req.session.user = { email, password: ciphertext };
      res.render("calendar", {
        title: "Calendar | Avatar Box",
        images: calendar.images
      });
    }).catch((err) => {
      console.log(err);
      res.end();
    });
  }
})

router.get('/signout', (req, res) => {
  req.session.user = null;
  res.redirect('/');
})

module.exports = router;
