const { Router } = require('express');
const { GravatarClient } = require('grav.client');
const RsaService = require('../../Services/rsa.service');
const BuildCalendarUseCase = require('../../Application/build-calendar.use-case');
const ThanksView = require('../view-models/thanks');
const CalendarView = require('../view-models/calendar');

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
    const model = new CalendarView();
    model.title = "Calendar | Avatar Box";
    model.images = calendar.images;
    model.navbar.user = user;
    res.render("calendar", model);
  }).catch((err) => {
    console.log(err);
    res.end();
  });
})

router.post('/submit', (req, res) => {
  req.session.userid = null;
  res.render('thanks', new ThanksView());
})

module.exports = router;