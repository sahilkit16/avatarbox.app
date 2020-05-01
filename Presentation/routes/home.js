const { Router } = require('express');
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

router.post('/connect', async (req, res) => {
  const { user, isProgressive, ciphertext } = req.body;
  if (ciphertext && user) {
    const email = CacheService.get(user);
    req.session.user = { email, password: ciphertext };
    res.redirect('/calendar');
  }
})

router.get('/signout', (req, res) => {
  req.session.user = null;
  res.redirect('/');
})

module.exports = router;
