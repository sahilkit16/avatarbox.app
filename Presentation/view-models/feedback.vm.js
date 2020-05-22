const ThanksVM = require("./thanks.vm");

class FeedbackVM extends ThanksVM {
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
  }
}

module.exports = FeedbackVM;
