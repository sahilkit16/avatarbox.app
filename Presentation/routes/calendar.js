const { Router } = require("express");
const container = require("../../Common/di-container");
const ThanksVM = require("../view-models/thanks.vm");
const CalendarVM = require("../view-models/calendar.vm");
const HomeVM = require("../view-models/home.vm");
const ImageShortageVM = require("../view-models/image-shortage.vm");
const ImageShortageError = require("../../Domain/image-shortage.error");

const isAuthenticated = require("../middleware/is-authenticated");
const gravatarClientScope = require("../middleware/gravatar-client-scope");

const router = Router();

router.use(isAuthenticated);
router.use(gravatarClientScope);

router.get("/", async (req, res) => {
  const { user, calendar } = req.session;
  const renderCalendar = ({ images, isEnabled }) => {
    const model = new CalendarVM();
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
        const model = new HomeVM();
        model.User = user;
        model.prompt = new ImageShortageVM(err);
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
        const messageBroker = container.resolve("messageBroker");
        if (didToggleCalendar) {
          delete req.session.calendar;
          if (!calendar.isEnabled) {
            messageBroker.publish("update.now", user.email, { priority: 2 });
          }
        }
        if (didToggleCalendar && isNewUser) {
          delete req.session.isNewUser;
          return res.render("thanks", new ThanksVM());
        }
        res.redirect("/calendar#");
      })
      .catch(next);
  }
});

module.exports = router;
