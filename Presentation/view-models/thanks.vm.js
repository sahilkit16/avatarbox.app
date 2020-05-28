const NavBarVM = require("./navbar.vm");

class ThanksVM {
  constructor() {
    this.title = "Thanks | Avatar Box";
    this.navbar = new NavBarVM();
    this.navbar.isCosmetic = true;
    this.navbar.isTransparent = false;
    this.appziScript = "https://w.appzi.io/bootstrap/bundle.js?token=h2U0P";
    this.hideCoverImage = true;
  }
  toObject() {
    return JSON.parse(JSON.stringify(this));
  }
}

module.exports = ThanksVM;
