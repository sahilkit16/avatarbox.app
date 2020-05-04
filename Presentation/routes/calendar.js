const { Router } = require("express");
const { GravatarClient } = require("grav.client");
const RsaService = require("../../Services/rsa.service");
const UserService = require("../../Services/user.service");
const BuildCalendarUseCase = require("../../Application/build-calendar.use-case");
const ThanksView = require("../view-models/thanks");
const CalendarView = require("../view-models/calendar");
const CacheService = require("../../Services/cache.service");

const router = Router();

// TODO: refactor + simplify
router.get("/", async (req, res) => {
  const { user, userid } = req.session;
  if (!user) {
    return res.redirect("/");
  }
  const renderCalendar = (calendar) => {
    const model = new CalendarView();
    model.title = "Calendar | Avatar Box";
    model.images = calendar.images;
    model.navbar.user = user;
    res.render("calendar", model);
  };
  const calendar = CacheService.get(`${userid}:calendar`);
  if (calendar) {
    return renderCalendar(calendar);
  }
  const password = await RsaService.decrypt(user.password);
  const client = new GravatarClient(user.email, password);
  const buildCalendar = new BuildCalendarUseCase();
  const _user = await UserService.get(user.email);
  buildCalendar.isEnabled = _user.calendars[0].isEnabled;
  buildCalendar.client = client;
  buildCalendar
    .execute()
    .then((calendar) => {
      CacheService.set(`${userid}:calendar`, calendar);
      renderCalendar(calendar);
    })
    .catch((err) => {
      console.log(err);
      res.end();
    });
});

router.post("/submit", (req, res) => {
  res.render("thanks", new ThanksView());
});

module.exports = router;
