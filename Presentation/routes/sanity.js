const { Router } = require("express");
const router = Router();
const ThanksView = require("../view-models/thanks");
const CalendarView = require("../view-models/calendar");
const HomeView = require("../view-models/home");
const ImageShortagePrompt = require("../view-models/image-shortage");
const ImageShortageError = require("../../Domain/image-shortage.error");
const ErrorCode = require("../../Domain/error-code");

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
  model.validationMessage = "Invalid email or password";
  res.render("home", model);
});

router.get("/image-shortage", (req, res) => {
  const model = new HomeView();
  model.user = model.navbar.user = true;
  const error = new ImageShortageError(ErrorCode.NoImages);
  model.prompt = new ImageShortagePrompt(error);
  res.render("home", model);
});

router.get("/server-error", (req, res, next) => {
  next(new Error("This is a test."));
});

module.exports = router;
