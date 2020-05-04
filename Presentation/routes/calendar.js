const { Router } = require("express");
const ThanksView = require("../view-models/thanks");
const CalendarView = require("../view-models/calendar");
const RouteOptions = require('./_routeOptions');

const isAuthenticated = require('../middleware/is-authenticated');

const router = Router();

router.use(isAuthenticated);

module.exports = function calendarRoute(options = new RouteOptions.Calendar()){
// TODO: refactor + simplify
router.get("/", async (req, res) => {
  const { user, userid } = req.session;
  const renderCalendar = (calendar) => {
    const model = new CalendarView();
    model.title = "Calendar | Avatar Box";
    model.images = calendar.images;
    model.navbar.user = user;
    res.render("calendar", model);
  };
  const calendarCacheKey = `${userid}:calendar`;
  const calendar = options.cache.get(calendarCacheKey);
  if (calendar) {
    return renderCalendar(calendar);
  }
  const password = await options.rsa.decrypt(user.password);
  const client = options.useGravatarClient(user.email, password);
  const _user = await options.user.get(user.email);
  const { buildCalendar } = options;
  buildCalendar.isEnabled = _user.calendars[0].isEnabled;
  buildCalendar.client = client;
  buildCalendar
    .execute()
    .then((calendar) => {
      options.cache.set(calendarCacheKey, calendar);
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

  return router;
}
