// https://bitbucket.org/mrtillman/avatarbox.web/wiki/Error%20Codes

const ErrorCode = {
  MissingEmail: 1000,
  MissingPassword: 1001,
  InvalidCiphertext: 1002,
  InvalidCreds: 1003,
  NoImages: 2000,
  SingleImage: 2001,
};

module.exports = ErrorCode;
