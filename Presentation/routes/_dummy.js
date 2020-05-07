const { Router } = require("express");
const router = Router();
const ThanksView = require("../view-models/thanks");
const CalendarView = require("../view-models/calendar");
const HomeView = require("../view-models/home");

router.get("/calendar", (req, res) => {
  const model = new CalendarView();
  model.title = "Calendar | Avatar Box";
  model.images = [
    { day: "Now", url: "https://via.placeholder.com/200" },
    { day: "Tomorrow", url: "https://via.placeholder.com/200" },
    { day: "Monday", url: "https://via.placeholder.com/200" },
    { day: "Tuesday", url: "https://via.placeholder.com/200" },
    { day: "Wednesday", url: "https://via.placeholder.com/200" },
  ];
  res.render("calendar", model);
});

router.get("/thanks", (req, res) => {
  res.render("thanks", new ThanksView());
});

router.get("/home", (req, res) => {
  res.render("home", new HomeView());
});

router.get("/invalid-creds", (req, res) => {
  const model = new HomeView();
  model.errorMessage = "Invalid email or password";
  res.render("home", model);
});

// insufficient-images

module.exports = router;
