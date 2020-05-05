const { Router } = require("express");
const { container } = require("../../Common/di-container");
const ThanksView = require("../view-models/thanks");
const CalendarView = require("../view-models/calendar");

const isAuthenticated = require("../middleware/is-authenticated");
const gravatarClientScope = require("../middleware/gravatar-client-scope");

const router = Router();

router.use(isAuthenticated);
router.use(gravatarClientScope);

router.get("/", async (req, res) => {
  const { user, userid } = req.session;
  const renderCalendar = (calendar) => {
    const model = new CalendarView();
    model.title = "Calendar | Avatar Box";
    model.images = calendar.images;
    model.isEnabled = calendar.isEnabled;
    model.navbar.user = user;
    res.render("calendar", model);
  };
  const cacheService = container.resolve("cacheService");
  const calendarCacheKey = `${userid}:calendar`;
  const calendar = cacheService.get(calendarCacheKey);
  if (calendar) {
    return renderCalendar(calendar);
  }
  const buildCalendar = container.resolve("buildCalendar");
  buildCalendar.client = req.scope.resolve("gravatarClient");
  buildCalendar
    .execute()
    .then((calendar) => {
      cacheService.set(calendarCacheKey, calendar);
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
