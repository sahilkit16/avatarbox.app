const CustomError = require('./custom.error');
const ErrorCode = require('./error-code');

class MissingCalendarError extends CustomError {
  constructor(){
    super(ErrorCode.MissingCalendar);
  }
}

module.exports = MissingCalendarError;
