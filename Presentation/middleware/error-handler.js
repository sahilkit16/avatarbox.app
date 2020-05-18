require('dotenv').config();
const container = require("../../Common/di-container");
const crashReporter = container.resolve("crashReporter");
const logger = container.resolve("logger");
const ErrorView = require("../view-models/error");

function errorHandler(err, req, res, next) {
  const model = new ErrorView();
  const { message } = err;
  model.message = message;
  model.title = `500 Error | Avatar Box`;
  crashReporter.submit(err);
  logger.error(message);
  if(!process.env.DEV_ENV) {
    res.render("error", model);
  } else {
    next(err);
  }
}

module.exports = errorHandler;
