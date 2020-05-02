const { Router } = require('express');
const { GravatarClient } = require('grav.client');
const CacheService = require('../../Services/cache.service');
const router = Router();

router.post('/get-started', (req, res) => {
  const { email, isProgressive } = req.body;
  let client, redirectUrl = "/";
  if (email) {
    client = new GravatarClient(email, null);
    const userid = client.emailHash;
    req.session.userid = userid;
    CacheService.set(userid, email);
    redirectUrl += `?next=1`;
  }
  if (isProgressive) {
    redirectUrl += "#here";
  }
  res.redirect(redirectUrl);
})

router.post('/sign-in', async (req, res) => {
  const { isProgressive, ciphertext } = req.body;
  const { userid } = req.session;
  if (userid && ciphertext) {
    const email = CacheService.get(userid);
    req.session.user = { email, password: ciphertext };
    res.redirect('/calendar');
  }
})

router.get('/sign-out', (req, res) => {
  req.session.userid = null;
  req.session.user = null;
  res.redirect('/');
})

module.exports = router;
