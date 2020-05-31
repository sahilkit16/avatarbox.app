const NavBarVM = require("./navbar.vm");

class ThanksVM {
  constructor() {
    this.title = "Thanks | Avatar Box";
    this.navbar = new NavBarVM();
    this.navbar.isCosmetic = true;
    this.navbar.isTransparent = false;
    this.hideCoverImage = true;
  }
  toObject() {
    return JSON.parse(JSON.stringify(this));
  }
}

module.exports = ThanksVM;
