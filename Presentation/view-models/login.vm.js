class LoginVM {
  constructor(){
    this.email = null;
    this.password = null;
    this.isValid = false;
    this.errors = {
      email: "Missing email",
      password: "Missing password"
    }
  }
}

module.exports = LoginVM;
