const NavBarView = require("./_navbar");

class HomeView {
  constructor() {
    this.navbar = new NavBarView();
    this.action = "/home/sign-in";
    this.validationMessage = null;
    this.prompt = null;
    this.user = null;
  }
}

module.exports = HomeView;
