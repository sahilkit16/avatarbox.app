const NavBarVM = require("./navbar.vm");

class ThanksVM {
  constructor() {
    this.navbar = new NavBarVM();
    this.navbar.isCosmetic = true;
    this.navbar.isTransparent = false;
    this.appziScript = "https://w.appzi.io/bootstrap/bundle.js?token=h2U0P";
  }
}

module.exports = ThanksVM;
