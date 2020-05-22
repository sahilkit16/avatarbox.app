const NavBarView = require("./navbar.vm");

class ThanksView {
  constructor() {
    this.navbar = new NavBarView();
    this.navbar.isCosmetic = true;
    this.navbar.isTransparent = false;
  }
}

module.exports = ThanksView;
