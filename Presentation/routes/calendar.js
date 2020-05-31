const { Router } = require("express");
const container = require("../../Common/di-container");
const ImageShortageVM = require("../view-models/image-shortage.vm");
const ImageShortageError = require("../../Domain/image-shortage.error");
const ShortId = require("shortid");

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
      .then((calendar) => calendar)
      .catch((err) => {
        logger.error(err.message);
        if (err instanceof ImageShortageError) {
          req.session.prompt = new ImageShortageVM(err);
          if (req.isAjax) {
            res.status(400).json({ code: err.code, message: err.message });
          } else {
            res.redirect("/");
          }
        } else {
          next(err);
        }
      });
  };
  next();
});

router.get("/images", async (req, res) => {
  const calendar = await req.buildCalendar();
  res.json(calendar.images);
})

router.use((req, res, next) => {
  req.session.user.cacheBuster = ShortId();
  if(req.method == "GET") {
    req.buildCalendar().then(calendar => {
      req.session.calendar = calendar;
      return next();
    })
  } else {
    next(); 
  }
});

router.post("/submit", async (req, res, next) => {
  const { user } = req.session;
  const isCalendarEnabled = req.session.calendar.isEnabled;
  const isNewUser = req.session.user.isNew;
  delete req.session.calendar;
  delete req.session.user.isNew;
  const userService = container.resolve("userService");
  userService
    .toggleCalendar(user.email, isCalendarEnabled)
    .then(async (didToggleCalendar) => {
      if(!didToggleCalendar){
        return res.redirect("/calendar");
      }
      if (!isCalendarEnabled) {
        const messageBroker = container.resolve("messageBroker");
        messageBroker.publish("update.now", user.email, { priority: 2 });
      }
      if (isNewUser) {
        const cacheService = container.resolve("cacheService");
        cacheService.retainThanksPage(user.hash);
      }
      if (req.isAjax) {
        const calendar = await req.buildCalendar();
        req.session.calendar = calendar;
        return res.json(calendar);
      } else if (isNewUser) {
        return res.redirect(`/thanks`);
      } else {
        return res.redirect(`/calendar`);
      }
    })
    .catch((err) => {
      logger.error(err.message);
      next(err);
    });
});

module.exports = router;
