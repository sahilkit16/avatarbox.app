const ThanksView = require("./thanks");

class FeedbackVM extends ThanksView {
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
