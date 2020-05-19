require('dotenv').config();
const container = require("../../Common/di-container");
const crashReporter = container.resolve("crashReporter");
const logger = container.resolve("logger");
const ErrorView = require("../view-models/error");

function errorHandler(err, req, res, next) {
  const eventId = crashReporter.submit(err);
  const model = new ErrorView();
  const { message } = err;
  model.message = message;
  model.title = `500 Error | Avatar Box`;
  model.eventId = eventId;
  req.session.eventId = eventId;
  logger.error(message);
  if(process.env.DEV_ENV) {
    next(err);
  } else {
    res.render("error", model);
  }
}

module.exports = errorHandler;
