class ImageShortageError extends Error {
  constructor(code) {
    super();
    this.code = code;
  }
}

module.exports = ImageShortageError;
