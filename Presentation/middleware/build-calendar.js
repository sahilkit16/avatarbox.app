import { container } from "../../Common/di-container";
import ShortId from "shortid";
import {
  use,
  isAuthenticated,
  isAjax,
  gravatarClientScope,
} from "../middleware";

const cache = container.resolve("cacheService");

export async function buildCalendar(req, res, next) {
  await use(req, res, [isAuthenticated, isAjax, gravatarClientScope]);
  req.session.user.cacheBuster = ShortId();
  const client = req.scope.resolve("gravatarClient");
  const buildCalendar = container.resolve("buildCalendar");
  buildCalendar.client = client;
  cache
    .hget(client.email, "calendar")
    .then((calendar) => {
      if (calendar) return calendar;
    })
    .then(async (calendar) => {
      if (calendar) return calendar;
      const _calendar = await buildCalendar.execute();
      await cache.hset(client.email, "calendar", _calendar);
      return _calendar;
    })
    .then((calendar) => {
      req.session.calendar = calendar;
      next(calendar);
    })
    .catch((err) => next(err));
}
