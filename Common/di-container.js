const awilix = require("awilix");
const container = awilix.createContainer();
const BuildCalendarUseCase = require("../Application/build-calendar.use-case");
const RsaService = require("../Services/rsa.service");
const UserService = require("../Services/user.service");
const CacheService = require("../Services/cache.service");

exports.configureServices = function () {
  container.register({
    buildCalendar: awilix.asClass(BuildCalendarUseCase),
    rsaService: awilix.asClass(RsaService),
    userService: awilix.asClass(UserService),
    cacheService: awilix.asClass(CacheService),
  });
};

exports.container = container;
