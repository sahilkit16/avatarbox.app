const { Router } = require("express");
const router = Router();
const ThanksVM = require("../view-models/thanks.vm");
const CalendarVM = require("../view-models/calendar.vm");
const HomeVM = require("../view-models/home.vm");
const ImageShortageVM = require("../view-models/image-shortage.vm");
const ImageShortageError = require("../../Domain/image-shortage.error");
const ErrorCode = require("../../Domain/error-code");

router.get("/calendar", (req, res) => {
  const model = new CalendarVM();
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
  res.render("thanks", new ThanksVM());
});

router.get("/home", (req, res) => {
  res.render("home", new HomeVM());
});

router.get("/invalid-creds", (req, res) => {
  const model = new HomeVM();
  model.validationMessage = "Invalid email or password";
  res.render("home", model);
});

router.get("/image-shortage", (req, res) => {
  const model = new HomeVM();
  model.user = model.navbar.user = true;
  const error = new ImageShortageError(ErrorCode.NoImages);
  model.prompt = new ImageShortageVM(error);
  res.render("home", model);
});

router.get("/server-error", (req, res, next) => {
  next(new Error("This is a test."));
});

module.exports = router;
