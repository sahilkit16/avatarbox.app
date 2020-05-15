require('dotenv').config();
const Sentry = require('@sentry/node');

class CrashReporter {
  constructor(){
    Sentry.init({ dsn: process.env.SENTRY_SOURCE });
    this.reporter = Sentry;   
  }
  submit(err){
    this.reporter.captureException(err);
  }
}

module.exports = CrashReporter;
