import {
  use,
  isAjax,
  buildCalendar,
  runMiddleware,
  isAuthenticated,
} from "../../../middleware";
import { withSession } from "next-session";
import { withSentry } from "@sentry/nextjs";
import { container } from "../../../../Common/di-container";
import { redirect } from "next/dist/server/api-utils";
import { source } from "../../../middleware/source";

const handler = async (req, res) => {
  await use(req, res, [isAuthenticated, isAjax, source]);
  const { user } = req.session.passport;
  const isCalendarEnabled = req.session.calendar.isEnabled;
  req.session.calendar = null;
  const avbx =
    req.source == "gravatar"
      ? container.resolve("gravatarClient")
      : container.resolve("twitterClient");

  const id = user.email || user.id;

  if (!isCalendarEnabled) {
    const lastUpdated = new Date(user.lastUpdated);
    const isDueForUpdate = lastUpdated <= avbx.repo.calendar.daysAgo(1);
    await avbx.on(id);
    if (isDueForUpdate) {
      await avbx.touch({ id: user.id, source: req.source }).then(() => {
        req.session.passport.user.lastUpdated = avbx.repo.calendar.now();
      });
    }
  } else {
    await avbx.off(id);
  }

  await runMiddleware(req, res, buildCalendar);

  if (res.headersSent) return;

  return req.isAjax
    ? res.json(req.session.calendar)
    : redirect(res, `/calendar`);
};

const cache = container.resolve("cacheService");

export default withSentry(
  withSession(handler, {
    store: cache.redis.store,
  })
);
