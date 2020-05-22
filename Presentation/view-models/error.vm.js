const ThanksView = require("./thanks");

class ErrorVM extends ThanksView {
  constructor() {
    super();
    this.title = `Error | Avatar Box`;
    this.subtitle = "Oops!";
    this.message = "An error has occurred.";
    this.eventId = null;
  }
}

module.exports = ErrorVM;
