const { Router } = require('express');
const router = Router();
const ThanksView = require('../view-models/thanks');

router.get('/calendar', (req, res) => {
  res.render("calendar", {
    title: "Calendar | Avatar Box",
    images: [
      { day: "Now", url: "https://via.placeholder.com/200" },
      { day: "Tomorrow", url: "https://via.placeholder.com/200" },
      { day: "Monday", url: "https://via.placeholder.com/200" },
      { day: "Tuesday", url: "https://via.placeholder.com/200" },
      { day: "Wednesday", url: "https://via.placeholder.com/200" }
    ],
    navbar: { isCosmetic: false }
  });
});

router.get('/thanks', (req, res) => {
  const model = new ThanksView();
  model.navbar.isCosmetic = true;
  model.navbar.isTransparent = false;
  res.render('thanks', model);
})

module.exports = router;
