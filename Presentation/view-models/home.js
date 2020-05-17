const NavBarView = require("./_navbar");

class HomeView {
  constructor() {
    this.navbar = new NavBarView();
    this.formAction = "/home/sign-in";
    this.validationMessage = null;
    this.prompt = null;
    this._user = null;
  }
  get user(){
    return this._user;
  }
  set user(value){
    this._user = value;
    this.navbar.user = value;
  }
}

module.exports = HomeView;
