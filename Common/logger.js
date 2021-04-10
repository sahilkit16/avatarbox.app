import { createLogger, transports } from "winston";

// https://www.npmjs.com/package/winston#logging-levels
// https://tools.ietf.org/html/rfc5424

export class Logger {
  constructor() {
    this.self = createLogger({
      levels: {
        emerg: 0,
        alert: 1,
        crit: 2,
        error: 3,
        warn: 4,
        notice: 5,
        info: 6,
        debug: 7,
      },
      transports: new transports.Console(),
    });
  }

  alert(message) {
    this.self.alert(message);
  }
  crit(message) {
    this.self.crit(message);
  }
  error(message) {
    this.self.error(message);
  }
  warn(message) {
    this.self.warn(message);
  }
  notice(message) {
    this.self.notice(message);
  }
  info(message) {
    this.self.info(message);
  }
  debug(message) {
    this.self.debug(message);
  }
}
