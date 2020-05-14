const BuildCalendarUseCase = require('./build-calendar.use-case');

describe('BuildCalendarUseCase', () => {
  let useCase;
  beforeEach(() => {
    useCase = new BuildCalendarUseCase();
  })
  it('should work', () => {
    expect(useCase.execute).toBeDefined();
  })
})