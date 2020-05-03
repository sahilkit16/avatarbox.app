const NavBarView = require("./_navbar");

class ThanksView {
  constructor() {
    this.navbar = new NavBarView();
    this.navbar.isCosmetic = true;
    this.navbar.isTransparent = false;
  }
}

module.exports = ThanksView;
