class CustomError extends Error {
  constructor(code, message) {
    const _message = `[${code}]: ${message}`;
    super(_message);
    Object.defineProperty(this, 'code', {
      enumerable: false,
      value: code,
    })

    Object.defineProperty(this, 'message', {
      enumerable: false,
      value: _message,
    })

    Object.defineProperty(this, 'name', {
      enumerable: false,
      value: this.constructor.name,
    })

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = CustomError;
