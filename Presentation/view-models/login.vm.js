const validator = require("validator").default;

const getProxy = (vm) => {
  return new Proxy(vm, {
    set: (target, key, value) => {
      if (key != "email" && key != "password") {
        return true;
      }

      if (!value) {
        target.errors[key] = `Missing ${key}`;
        return true;
      }

      if (key == "email") {
        if (validator.isEmail(value)) {
          target.errors[key] = null;
          target[key] = value;
        } else {
          target.errors[key] = "Invalid email";
          return true;
        }
      }

      if (value.length > 100) {
        target[key] = null;
        target.errors[key] = `Must be 100 characters or less`;
        return true;
      } else {
        target.errors[key] = null;
      }

      if (key == "password") {
        target[key] = value;
      }

      if (target.email) {
        target.errors.email = null;
      }

      if (target.password) {
        target.errors.password = null;
      }

      return true;
    },
  });
};

class LoginVM {
  constructor() {
    this.email = null;
    this.password = null;
    this.errors = {
      email: "Missing email",
      password: "Missing password",
    };
    return getProxy(this);
  }
}

module.exports = LoginVM;
