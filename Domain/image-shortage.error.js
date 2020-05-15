const CustomError = require('./custom.error');

class ImageShortageError extends CustomError { }

module.exports = ImageShortageError;
