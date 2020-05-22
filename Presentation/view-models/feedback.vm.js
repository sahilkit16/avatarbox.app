const ThanksVM = require("./thanks.vm");

class FeedbackVM extends ThanksVM {
  constructor() {
    super();
    this.eventId = null;
    this.name = null;
    this.email = null;
    this.comments = null;
    this.validationSummary = {
      name: null,
      email: null,
      comments: null,
    };
  }
}

module.exports = FeedbackVM;
