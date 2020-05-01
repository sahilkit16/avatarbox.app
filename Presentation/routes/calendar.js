const { Router } = require('express');
const { GravatarClient } = require('grav.client');
const RsaService = require('../../Services/rsa.service');
const BuildCalendarUseCase = require('../../Application/build-calendar.use-case');
const router = Router();

router.get('/', async (req, res) => {
  if(!req.session.user){
    return res.redirect('/');
  }
  const { user } = req.session;
  const password = await RsaService.decrypt(user.password);
  const client = new GravatarClient(user.email, password);
  const buildCalendar = new BuildCalendarUseCase();
  buildCalendar.client = client;
  buildCalendar.execute().then(calendar => {
    res.render("calendar", {
      title: "Calendar | Avatar Box",
      images: calendar.images
    });
  }).catch((err) => {
    console.log(err);
    res.end();
  });
})

router.post('/activate', (req, res) => {
  res.render('confirm');
})

module.exports = router;