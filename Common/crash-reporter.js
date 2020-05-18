require("dotenv").config();
const Sentry = require("@sentry/node");

class CrashReporter {
  constructor() {
    if (!!process.env.DEV_ENV) {
      this.reporter = {
        captureException: console.error,
      };
    } else {
      Sentry.init({ dsn: process.env.SENTRY_SOURCE });
      this.reporter = Sentry;
    }
  }
  submit(err) {
    return this.reporter.captureException(err);
  }
}

module.exports = CrashReporter;
