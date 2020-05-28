require("dotenv").config();
const { Router } = require("express");
const fetch = require("node-fetch");
const ThanksVM = require("../view-models/thanks.vm");
const FeedbackVM = require("../view-models/feedback.vm");
const router = Router();
const Logger = require("../../Common/logger");

const logger = new Logger();
const thanksModel = new ThanksVM();

router.post("/", async (req, res) => {
  const feedbackVm = new FeedbackVM();
  feedbackVm.eventId = req.body.eventId || req.session.eventId;
  feedbackVm.name = req.body.name;
  feedbackVm.email = req.body.email;
  feedbackVm.comments = req.body.comments;

  if (
    feedbackVm.errors.name ||
    feedbackVm.errors.email ||
    feedbackVm.errors.comments
  ) {
    return res.render("feedback", feedbackVm);
  }

  if (process.env.DEV_ENV) {
    req.session.eventId = null;
    return res.render("thanks", thanksModel);
  }

  fetch(
    "https://sentry.io/api/0/projects/avatar-box/avatarboxweb/user-feedback/",
    {
      method: "POST",
      headers: {
        authorization: `DSN ${process.env.SENTRY_DSN}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(feedbackVm.toObject()),
    }
  ).then(async (_res) => {
    if (_res.ok) {
      req.session.eventId = null;
      res.render("thanks", thanksModel);
    } else {
      req.session.eventId = null;
      const message = await _res.text();
      logger.warn("no feedback submitted");
      logger.warn(`${message || _res.statusText}`);
      res.render("thanks", thanksModel);
    }
  });
});

module.exports = router;
