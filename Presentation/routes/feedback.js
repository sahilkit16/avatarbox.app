require('dotenv').config();
const { Router } = require("express");
const fetch = require('node-fetch');
const ThanksView = require('../view-models/thanks');
const router = Router();
const Logger = require("../../Common/logger");

const logger = new Logger();
const model = new ThanksView();

router.post("/", async (req, res) => {
  const feedback = req.body;
  // TODO: form validation
  if(!feedback.comments) {
    logger.warn("aborting feedback - no comments provided");
    res.render('thanks', model);
  }
  fetch("https://sentry.io/api/0/projects/avatar-box/avatarboxweb/user-feedback/",{
    method: "POST",
    headers: {
      "authorization": `DSN ${process.env.SENTRY_SOURCE}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(feedback)
  }).then(async (_res) => {
    if (_res.ok) {
      res.render('thanks', model);
    } else {
      const message = await _res.text();
      logger.warn("no feedback submitted");
      logger.warn(`${message || _res.statusText}`);
      res.render('thanks', model);
    }
  });
})

module.exports = router;
