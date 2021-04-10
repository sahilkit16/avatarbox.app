import { CustomError } from "./custom.error";
import { ErrorCode } from "./error-code";

export class ImageShortageError extends CustomError {
  constructor(code) {
    let message;
    if (code == ErrorCode.NoImages) {
      message = "no images";
    } else if (code == ErrorCode.SingleImage) {
      message = "2 or more images needed";
    }
    super(code, message);
  }
}
