const { createLogger, transports } = require('winston');

// https://www.npmjs.com/package/winston#logging-levels
// https://tools.ietf.org/html/rfc5424

class Logger {
  constructor(logger = null){
    this.logger = logger || createLogger({
      levels: {
        emerg: 0, 
        alert: 1, 
        crit: 2, 
        error: 3, 
        warn: 4, 
        notice: 5, 
        info: 6, 
        debug: 7
      },
      // TODO: use file transport in dev, http transport (timber.io) in prod
      transports: new transports.Console() 
    });
  }

  alert(message) {
    this.logger.alert(message);
  }
  crit(message) {
    this.logger.crit(message);
  }
  error(message) {
    this.logger.error(message);
  }
  warn(message) {
    this.logger.warn(message);
  }
  notice(message) {
    this.logger.notice(message);
  }
  info(message) {
    this.logger.info(message);
  }
  debug(message) {
    this.logger.debug(message);
  }
}

module.exports = Logger;
