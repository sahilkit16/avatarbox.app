const Sentry = require("@sentry/browser");

class CrashReporter {
  constructor() {
    if (!!process.env.DEV_ENV) {
      this.reporter = {
        captureException: (error) => {
          console.error(error);
          return -1;
        },
      };
    } else {
      Sentry.init({ 
        dsn:
          "https://83125bd9f55946968482f22cfc78d236@o391492.ingest.sentry.io/5241503",
      });
      this.reporter = Sentry;
    }
  }
  submit(err) {
    return this.reporter.captureException(err);
  }
}

module.exports = CrashReporter;
