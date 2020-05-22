const NavBarView = require("./navbar.vm");

class CalendarVM {
  constructor() {
    this.images = [];
    this.navbar = new NavBarView();
    this.navbar.isCosmetic = false;
    this.navbar.isTransparent = false;
    this.isEnabled = false;
  }
}

module.exports = CalendarVM;
