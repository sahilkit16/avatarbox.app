import { validator } from "validator";
import { ThanksVM } from "./thanks.vm";

const getProxy = (vm) => {
  return new Proxy(vm, {
    set: (target, key, value) => {
      if (key == "eventId") {
        if (value && typeof value == "string") {
          target[key] = value;
          return true;
        }
        return false;
      }

      if (key != "name" && key != "email" && key != "comments") {
        return true;
      }

      target[key] = value;

      if (!value) {
        target.errors[key] = "This field is required";
        return true;
      }

      if (key == "email") {
        if (validator.isEmail(value)) {
          target.errors[key] = null;
        } else {
          target.errors[key] = "Invalid email";
          return true;
        }
      }

      if ((key == "name" || key == "email") && value.length > 100) {
        target.errors[key] = `Must be 100 characters or less`;
        return true;
      } else {
        target.errors[key] = null;
      }

      if (key == "comments" && value.length > 500) {
        target.errors[key] = `Must be 500 characters or less`;
        return true;
      } else {
        target.errors[key] = null;
      }

      return true;
    },
  });
};

export class FeedbackVM extends ThanksVM {
  constructor() {
    super();
    const requiredFieldMessage = "This field is required";
    this.eventId = null;
    this.name = null;
    this.email = null;
    this.comments = null;
    this.errors = {
      name: requiredFieldMessage,
      email: requiredFieldMessage,
      comments: requiredFieldMessage,
    };
    return getProxy(this);
  }

  toObject() {
    return {
      name: this.name,
      email: this.email,
      comments: this.comments,

      // rename event id field for Sentry
      // see https://docs.sentry.io/api/projects/post-project-user-reports/
      event_id: this.eventId,
    };
  }
}
