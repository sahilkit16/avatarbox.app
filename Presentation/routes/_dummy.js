const { Router } = require('express');
const router = Router();

router.get('/calendar', (req, res) => {
  res.render("calendar", {
    title: "Calendar | Avatar Box",
    images: [
      { day: "Now", url: "https://via.placeholder.com/200" },
      { day: "Tomorrow", url: "https://via.placeholder.com/200" },
      { day: "Monday", url: "https://via.placeholder.com/200" },
      { day: "Tuesday", url: "https://via.placeholder.com/200" },
      { day: "Wednesday", url: "https://via.placeholder.com/200" }
    ]
  });
});

router.get('/confirm', (req, res) => {
  res.render('confirm', {
    navbar: { isCentered: true }
  });
})

module.exports = router;
