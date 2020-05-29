const { Router } = require("express");
const container = require("../../Common/di-container");
const ImageShortageVM = require("../view-models/image-shortage.vm");
const ImageShortageError = require("../../Domain/image-shortage.error");

const isAjax = require("../middleware/is-ajax");
const isAuthenticated = require("../middleware/is-authenticated");
const gravatarClientScope = require("../middleware/gravatar-client-scope");

const logger = container.resolve("logger");

const router = Router();

router.use(isAjax);
router.use(isAuthenticated);
router.use(gravatarClientScope);

router.use((req, res, next) => {
  req.buildCalendar = () => {
    const buildCalendar = container.resolve("buildCalendar");
    buildCalendar.client = req.scope.resolve("gravatarClient");
    return buildCalendar
      .execute()
      .then((calendar) => {
        req.session.calendar = calendar;
        return calendar;
      })
      .catch((err) => {
        logger.error(err.message);
        if (err instanceof ImageShortageError) {
          req.session.prompt = new ImageShortageVM(err);
          if(req.isAjax){
            res.status(400).json({ code: err.code, message: err.message });
          } else {
            res.redirect("/");
          }
        } else {
          next(err);
        }
      });
  }
  next();
})

router.use(async (req, res, next) => {
  if (req.session.calendar) {
    next();
  } else {
    await req.buildCalendar();
    next();
  }
});

router.post("/submit", async (req, res, next) => {
  const { user, calendar } = req.session;
  const isNewUser = user.isNew;
  if (calendar) {
    const userService = container.resolve("userService");
    userService
      .toggleCalendar(user.email, calendar.isEnabled)
      .then(async (didToggleCalendar) => {
        if (didToggleCalendar) {
          delete req.session.calendar;
          if (!calendar.isEnabled) {
            const messageBroker = container.resolve("messageBroker");
            messageBroker.publish("update.now", user.email, { priority: 2 });
          }
        }
        if(isNewUser){
          const cacheService = container.resolve("cacheService");
          cacheService.retainThanksPage(user.hash);
          delete req.session.user.isNew;
        }
        if(req.isAjax){
          return res.json(await req.buildCalendar());
        } else if (isNewUser && didToggleCalendar) {
          return res.redirect(`/thanks`);
        } else {
          return res.redirect(`/calendar`);
        }
      })
      .catch(err => {
        logger.error(err.message);
        next(err);
      });
  }
});

module.exports = router;
