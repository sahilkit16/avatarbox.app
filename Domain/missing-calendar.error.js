const { CustomError } = require("./custom.error");
const { ErrorCode } = require("./error-code");

export class MissingCalendarError extends CustomError {
  constructor() {
    super(ErrorCode.MissingCalendar, "calendar not found");
  }
}
