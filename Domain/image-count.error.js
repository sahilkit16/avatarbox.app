class ImageCountError extends Error {
  constructor(code) {
    super();
    this.code = code;
  }
}

module.exports = ImageCountError;
