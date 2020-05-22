const NavBarView = require("./navbar.vm");

class ThanksVM {
  constructor() {
    this.navbar = new NavBarView();
    this.navbar.isCosmetic = true;
    this.navbar.isTransparent = false;
  }
}

module.exports = ThanksVM;
