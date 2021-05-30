import { NavBarVM } from "./navbar.vm";

export class AvatarsVM {
  constructor() {
    this.title = "Avatars | Avatar Box";
    this.calendar = {
      images: [],
      isEnabled: false,
    };
    this.navbar = new NavBarVM();
    this.navbar.isCosmetic = false;
    this.navbar.isTransparent = false;
    this.hideCoverImage = true;
    this.user = null;
    this.menu = {
      visible: false,
    };
  }
  get User() {
    return this.user;
  }
  set User(value) {
    this.user = value;
    this.navbar.user = value;
  }
  toObject() {
    return JSON.parse(JSON.stringify(this));
  }
}
