const awilix = require("awilix");
const container = awilix.createContainer();
const CrashReporter = require('./crash-reporter');
const Logger = require('./logger');
// const CacheService = require("../Services/cache.service");
const BuildCalendarUseCase = require("../Application/build-calendar.use-case");
const RsaService = require("../Services/rsa.service");
const UserService = require("../Services/user.service");

container.register({
  crashReporter: awilix.asClass(CrashReporter),
  logger: awilix.asClass(Logger),
  // cacheService: awilix.asClass(CacheService),
  buildCalendar: awilix.asClass(BuildCalendarUseCase),
  rsaService: awilix.asClass(RsaService),
  userService: awilix.asClass(UserService),
});

module.exports = container;
