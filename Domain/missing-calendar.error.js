import { CustomError } from "./custom.error";
import { ErrorCode } from "./error-code";

export class MissingCalendarError extends CustomError {
  constructor() {
    super(ErrorCode.MissingCalendar, "calendar not found");
  }
}
