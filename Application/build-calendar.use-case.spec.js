const BuildCalendarUseCase = require("./build-calendar.use-case");

describe("BuildCalendarUseCase", () => {
  let useCase;
  beforeEach(() => {
    useCase = new BuildCalendarUseCase({
      avbx: {},
    });
  });
  it("should work", () => {
    expect(useCase.execute).toBeDefined();
  });
});
