require("dotenv").config();
const { Router } = require("express");
const fetch = require("node-fetch");
const EmailValidator = require("email-validator");
const ThanksVM = require("../view-models/thanks.vm");
const FeedbackVM = require("../view-models/feedback.vm");
const router = Router();
const Logger = require("../../Common/logger");

const logger = new Logger();
const thanksModel = new ThanksVM();

router.post("/", async (req, res) => {
  // TODO: isolate validation logic

  const feedbackModel = new FeedbackVM();
  feedbackModel.eventId = (req.body.eventId || req.session.eventId);
  feedbackModel.name = req.body.name;
  feedbackModel.email = req.body.email;
  feedbackModel.comments = req.body.comments;

  const errors = {};
  const requiredFieldMessage = "This field is required";
  errors.name = feedbackModel.name ? null : requiredFieldMessage;
  errors.email = feedbackModel.email ? null : requiredFieldMessage;
  errors.comments = feedbackModel.comments
    ? null
    : requiredFieldMessage;

  if (feedbackModel.email && !EmailValidator.validate(feedbackModel.email)) {
    errors.email = "Invalid Email";
  }

  if (
    errors.name ||
    errors.email ||
    errors.comments
  ) {
    feedbackModel.errors = errors;
    return res.render("feedback", feedbackModel);
  }

  if (!!process.env.DEV_ENV) {
    req.session.eventId = null;
    return res.render("thanks", thanksModel);
  }
  
  // rename event id field for Sentry
  // see https://docs.sentry.io/api/projects/post-project-user-reports/
  feedbackModel.event_id = feedbackModel.eventId;
  delete feedbackModel.eventId;

  fetch(
    "https://sentry.io/api/0/projects/avatar-box/avatarboxweb/user-feedback/",
    {
      method: "POST",
      headers: {
        authorization: `DSN ${process.env.SENTRY_DSN}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(feedbackModel),
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
