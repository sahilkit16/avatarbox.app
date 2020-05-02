const ThanksView = require('./thanks');

class EncryptView extends ThanksView {
  constructor() {
    super();
    this.ciphertext = null;
    this.userid = null;
  }
}

module.exports = EncryptView;
