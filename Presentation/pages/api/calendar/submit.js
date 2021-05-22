import {
  use,
  isAjax,
  buildCalendar,
  runMiddleware,
  isAuthenticated,
} from "../../../middleware";
import { withSession } from "next-session";
import { container } from "../../../../Common/di-container";
import { redirect } from "next/dist/next-server/server/api-utils";

const handler = async (req, res) => {
  await use(req, res, [isAuthenticated, isAjax]);
  const { user } = req.session;
  const isCalendarEnabled = req.session.calendar.isEnabled;
  const avbx = container.resolve("avbx");
  if (!isCalendarEnabled) {
    const { email } = user;
    const lastUpdated = new Date(user.lastUpdated);
    avbx
      .on(email)
      .then(() => lastUpdated <= avbx.repo.calendar.daysAgo(1))
      .then((isDueForUpdate) => {
        if (isDueForUpdate) {
          avbx.touch({ id: user.id, source: "gravatar" }).then(() => {
            req.session.user.lastUpdated = avbx.repo.calendar.now();
          });
        }
      });
  } else {
    avbx.off(user.email);
  }

  await runMiddleware(req, res, buildCalendar);

  if (res.headersSent) return;

  return req.isAjax
    ? res.json(req.session.calendar)
    : redirect(res, `/calendar`);
};

const cache = container.resolve("cacheService");

export default withSession(handler, {
  store: cache.redis.store,
});
