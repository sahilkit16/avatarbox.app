const { Router } = require("express");
const container = require("../../Common/di-container");
// const ThanksVM = require("../view-models/thanks.vm");
// const CalendarVM = require("../view-models/calendar.vm");
// const HomeVM = require("../view-models/home.vm");
const ImageShortageVM = require("../view-models/image-shortage.vm");
const ImageShortageError = require("../../Domain/image-shortage.error");

const isAjax = require("../middleware/is-ajax");
const isAuthenticated = require("../middleware/is-authenticated");
const gravatarClientScope = require("../middleware/gravatar-client-scope");

const router = Router();

router.use(isAjax);
router.use(isAuthenticated);
router.use(gravatarClientScope);

// router.use((req, res, next) => {
//   req.renderCalendar = function (calendar) {
//     req.session.calendar = calendar;
//     const { images, isEnabled } = calendar;
//     if (req.isAjax) {
//       return res.json(calendar);
//     } else {
//       const model = new CalendarVM();
//       model.title = "Calendar | Avatar Box";
//       model.images = images;
//       model.isEnabled = isEnabled;
//       model.navbar.user = req.session.user;
//       return res.render("calendar", model);
//     }
//   };
//   next();
// });

router.use((req, res, next) => {
  if (req.session.calendar) {
    next();
  } else {
    const buildCalendar = container.resolve("buildCalendar");
    buildCalendar.client = req.scope.resolve("gravatarClient");
    buildCalendar
      .execute()
      .then((calendar) => {
        req.session.calendar = calendar;
        next();
      })
      .catch((err) => {
        if (err instanceof ImageShortageError) {
          req.session.prompt = new ImageShortageVM(err);
          res.redirect("/");
        } else {
          next(err);
        }
      });
  }
});

/*
router.get("/", async (req, res) => {
  const { user, calendar } = req.session;
  if (calendar) {
    return req.renderCalendar(calendar);
  }
  const buildCalendar = container.resolve("buildCalendar");
  buildCalendar.client = req.scope.resolve("gravatarClient");
  buildCalendar
    .execute()
    .then((newCalendar) => {
      req.renderCalendar(newCalendar);
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
*/

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
          const cacheService = container.resolve("cacheService");
          cacheService.saveThanksPage(user.hash);
          return res.redirect(`/thanks`);
        }
        const buildCalendar = container.resolve("buildCalendar");
        buildCalendar.client = req.scope.resolve("gravatarClient");
        buildCalendar.execute().then(() => {
          res.redirect("/calendar#");
        });
      })
      .catch(next);
  }
});

module.exports = router;
