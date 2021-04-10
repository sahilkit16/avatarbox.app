import * as awilix from "awilix";

import { CrashReporter } from "./crash-reporter.server";
import { Logger } from "./logger";
import { CacheService } from "../Services/cache.service";
import { BuildCalendarUseCase } from "../Application/build-calendar.use-case";
import { PusherClient } from "../Infrastructure/pusher.client";
import { AvbxGravatarClient } from "avatarbox.sdk";

export const container = awilix.createContainer();

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
