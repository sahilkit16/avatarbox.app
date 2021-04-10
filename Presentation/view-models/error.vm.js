import { ThanksVM } from "./thanks.vm";

export class ErrorVM extends ThanksVM {
  constructor() {
    super();
    this.title = `Error | Avatar Box`;
    this.subtitle = "Oops!";
    this.message = "An error has occurred.";
    this.statusCode = null;
    this.eventId = null;
  }
}
