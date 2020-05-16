const CustomError = require('./custom.error');
const ErrorCode = require('./error-code');

class ImageShortageError extends CustomError {
  constructor(code){
    let message;
    if(code == ErrorCode.NoImages){
      message = "no images"
    } else if (code == ErrorCode.SingleImage){
      message = "2 or more images needed"
    }
    super(code, message);
  }
 }

module.exports = ImageShortageError;
