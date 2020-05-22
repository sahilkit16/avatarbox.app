class LoginVM {
  constructor(){
    this.email = null;
    this.password = null;
    this.errors = {
      email: null,
      password: null
    }
  }
}

module.exports = LoginVM;
