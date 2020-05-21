const Sentry = require("@sentry/browser");

Sentry.init({ dsn: process.env.SENTRY_DSN })

class CrashReporter {
  constructor() {
    if (process.env.DEV_ENV) {
      this.reporter = {
        captureException: (error) => {
          console.error(error);
          return "event-id";
        },
        showReportDialog: (options) => {
          const userFeedback = prompt("what happened?");
          console.log(userFeedback);
          options.onLoad();
        }
      };
    } else {
      this.reporter = Sentry;
    }
  }
  getUserFeedback(options){
    this.reporter.showReportDialog(options);
  }
  submit(err) {
    return this.reporter.captureException(err);
  }
}

module.exports = CrashReporter;
