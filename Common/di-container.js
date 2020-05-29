const awilix = require("awilix");
const container = awilix.createContainer();

const DataStore = require("../Infrastructure/data-store");
const MessageBroker = require("../Infrastructure/message-broker");
const CrashReporter = require("./crash-reporter.server");
const Logger = require("./logger");
const CacheService = require("../Services/cache.service");
const BuildCalendarUseCase = require("../Application/build-calendar.use-case");
const RsaService = require("../Services/rsa.service");
const UserService = require("../Services/user.service");
const PusherClient = require("../Infrastructure/pusher.client");

container.register({
  dataStore: awilix.asClass(DataStore),
  messageBroker: awilix.asClass(MessageBroker, {
    lifetime: awilix.Lifetime.SINGLETON,
  }),
  crashReporter: awilix.asClass(CrashReporter),
  logger: awilix.asClass(Logger),
  cacheService: awilix.asClass(CacheService, {
    lifetime: awilix.Lifetime.SINGLETON,
  }),
  buildCalendar: awilix.asClass(BuildCalendarUseCase),
  rsaService: awilix.asClass(RsaService),
  userService: awilix.asClass(UserService),
  pusherClient: awilix.asClass(PusherClient),
});

module.exports = container;
