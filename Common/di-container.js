const awilix = require("awilix");
const container = awilix.createContainer();

const CrashReporter = require("./crash-reporter.server");
const Logger = require("./logger");
const CacheService = require("../Services/cache.service");
const {
  BuildCalendarUseCase,
} = require("../Application/build-calendar.use-case");
const PusherClient = require("../Infrastructure/pusher.client");
const { AvbxGravatarClient } = require("avatarbox.sdk");

container.register({
  avbx: awilix.asClass(AvbxGravatarClient),
  crashReporter: awilix.asClass(CrashReporter),
  logger: awilix.asClass(Logger),
  cacheService: awilix.asClass(CacheService, {
    lifetime: awilix.Lifetime.SINGLETON,
  }),
  buildCalendar: awilix.asClass(BuildCalendarUseCase),
  pusherClient: awilix.asClass(PusherClient),
});

module.exports = container;
