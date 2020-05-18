const ThanksView = require("./thanks");

class ErrorView extends ThanksView {
  constructor() {
    super();
    this.title = `Error | Avatar Box`;
    this.subtitle = "Oops!";
    this.message = "An error has occurred.";
    this.eventId = 0;
  }
}

module.exports = ErrorView;
