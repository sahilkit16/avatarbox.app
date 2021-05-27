import { StrategyBase } from "./build-calendar.strategy";

export class BuildCalendarUseCase {
  constructor() {
    this.strategy = new StrategyBase();
  }
  onError(errorHandler) {
    this.handleError = errorHandler;
  }
  async execute() {
    try {
      await this.strategy.load();
      await this.strategy.compute();
      return await this.strategy.render();
    } catch (error) {
      this.handleError(error);
    }
  }
}
