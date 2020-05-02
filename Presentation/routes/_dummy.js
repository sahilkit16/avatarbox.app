const { Router } = require('express');
const router = Router();
const ThanksView = require('../view-models/thanks');
const CalendarView = require('../view-models/calendar');

router.get('/calendar', (req, res) => {
  const model = new CalendarView();
  model.title = "Calendar | Avatar Box";
  model.images = [
    { day: "Now", url: "https://via.placeholder.com/200" },
    { day: "Tomorrow", url: "https://via.placeholder.com/200" },
    { day: "Monday", url: "https://via.placeholder.com/200" },
    { day: "Tuesday", url: "https://via.placeholder.com/200" },
    { day: "Wednesday", url: "https://via.placeholder.com/200" }
  ];
  res.render("calendar", model);
});

router.get('/thanks', (req, res) => {
  const model = new ThanksView();
  model.navbar.isCosmetic = true;
  model.navbar.isTransparent = false;
  res.render('thanks', model);
})

module.exports = router;
