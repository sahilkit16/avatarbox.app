require("dotenv").config();
const { container } = require("../../Common/di-container");
const crashReporter = container.resolve("crashReporter");
const logger = container.resolve("logger");
const ErrorVM = require("../view-models/error.vm");

export function errorHandler(err, req, res, next) {
  const eventId = crashReporter.submit(err);
  const model = new ErrorVM();
  const { message } = err;
  model.message = message;
  model.title = `500 Error | Avatar Box`;
  model.eventId = eventId;
  req.session.eventId = eventId;
  logger.error(message);
  if (process.env.DEV_ENV) {
    next(err);
  } else {
    res.render("error", model);
  }
}
