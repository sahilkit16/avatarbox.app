const ThanksView = require('./thanks');

class EncryptView extends ThanksView {
  constructor() {
    super();
    this.ciphertext = null;
  }
}

module.exports = EncryptView;
