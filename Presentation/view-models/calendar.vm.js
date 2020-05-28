const NavBarVM = require("./navbar.vm");

class CalendarVM {
  constructor() {
    this.title = "Calendar | Avatar Box";
    this.images = [];
    this.navbar = new NavBarVM();
    this.navbar.isCosmetic = false;
    this.navbar.isTransparent = false;
    this.isEnabled = false;
    this.hideCoverImage = true;
  }
  toObject() {
    return JSON.parse(JSON.stringify(this));
  }
}

module.exports = CalendarVM;
