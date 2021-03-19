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
});

router.use((req, res, next) => {
  req.session.user.cacheBuster = ShortId();
  if (req.method == "GET") {
    req.buildCalendar().then((calendar) => {
      req.session.calendar = calendar;
      return next();
    });
  } else {
    next();
  }
});

router.post("/submit", async (req, res, next) => {
  const { user } = req.session;
  const isCalendarEnabled = req.session.calendar.isEnabled;
  delete req.session.calendar;
  const avbx = container.resolve("avbx");

  if (!isCalendarEnabled) {
    const { email } = user;
    const lastUpdated = new Date(user.lastUpdated);
    avbx
      .on(email)
      .then(() => lastUpdated <= avbx.dynamo.calendar.daysAgo(1))
      .then((isDueForUpdate) => {
        if (isDueForUpdate) {
          avbx.touch(email).then(() => {
            req.session.user.lastUpdated = avbx.dynamo.calendar.now();
          });
        }
      });
  } else {
    avbx.off(user.email);
  }

  if (req.isAjax) {
    const calendar = await req.buildCalendar();
    req.session.calendar = calendar;
    return res.json(calendar);
  } else {
    return res.redirect(`/calendar`);
  }
});

module.exports = router;
