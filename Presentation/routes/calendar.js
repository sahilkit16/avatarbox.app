const { Router } = require("express");
const container = require("../../Common/di-container");
const ThanksView = require("../view-models/thanks");
const CalendarView = require("../view-models/calendar");
const HomeView = require("../view-models/home");
const ImageShortagePrompt = require("../view-models/image-shortage-prompt");
const ImageShortageError = require("../../Domain/image-shortage.error");

const isAuthenticated = require("../middleware/is-authenticated");
const gravatarClientScope = require("../middleware/gravatar-client-scope");

const router = Router();

router.use(isAuthenticated);
router.use(gravatarClientScope);

router.get("/", async (req, res) => {
  const { user, calendar } = req.session;
  const renderCalendar = ({ images, isEnabled }) => {
    const model = new CalendarView();
    model.title = "Calendar | Avatar Box";
    model.images = images;
    model.isEnabled = isEnabled;
    model.navbar.user = user;
    res.render("calendar", model);
  };
  if (calendar) {
    return renderCalendar(calendar);
  }
  const buildCalendar = container.resolve("buildCalendar");
  buildCalendar.client = req.scope.resolve("gravatarClient");
  buildCalendar
    .execute()
    .then(async (newCalendar) => {
      req.session.calendar = newCalendar;
      renderCalendar(newCalendar);
    })
    .catch((err) => {
      if (err instanceof ImageShortageError) {
        const model = new HomeView();
        model.user = model.navbar.user = user;
        model.prompt = new ImageShortagePrompt(err);
        res.render("home", model);
      } else {
        console.log(err);
        res.end();
      }
    });
});

router.post("/submit", async (req, res, next) => {
  const { user, isNewUser, calendar } = req.session;
  if (calendar) {
    const userService = container.resolve("userService");
    userService
      .toggleCalendar(user.email, calendar.isEnabled)
      .then((didToggleCalendar) => {
        if (didToggleCalendar) {
          delete req.session.calendar;
        }
        if (didToggleCalendar && isNewUser) {
          delete req.session.isNewUser;
          return res.render("thanks", new ThanksView());
        }
        res.redirect("/calendar");
      })
      .catch(next);
  }
});

module.exports = router;
