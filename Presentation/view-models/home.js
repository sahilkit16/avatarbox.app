const NavBarView = require("./_navbar");

class HomeView {
  constructor() {
    this.navbar = new NavBarView();
    this.formAction = "/home/sign-in";
    this.validationMessage = null;
    this.prompt = null;
    this.user = null;
  }
  get User() {
    return this.user;
  }
  set User(value) {
    this.user = value;
    this.navbar.user = value;
  }
  asPOJO() {
    return JSON.parse(JSON.stringify(this));
  }
}

module.exports = HomeView;
