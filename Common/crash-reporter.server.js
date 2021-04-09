import * as Sentry from "@sentry/browser";
import { config } from "dotenv";
config();

export class CrashReporter {
  constructor() {
    if (process.env.DEV_ENV) {
      this.reporter = {
        captureException: (error) => {
          console.error(error);
          return "event-id";
        },
      };
    } else {
      Sentry.init({ dsn: process.env.SENTRY_DSN });
      this.reporter = Sentry;
    }
  }
  submit(err) {
    return this.reporter.captureException(err);
  }
}
