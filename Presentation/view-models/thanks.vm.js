const NavBarVM = require("./navbar.vm");

class ThanksVM {
  constructor() {
    this.navbar = new NavBarVM();
    this.navbar.isCosmetic = true;
    this.navbar.isTransparent = false;
  }
}

module.exports = ThanksVM;
