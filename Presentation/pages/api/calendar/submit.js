import { use, isAjax, buildCalendar } from "../../../middleware";
import { withSession } from "next-session";
import { container } from "../../../../Common/di-container";
import { redirect } from "next/dist/next-server/server/api-utils";

export default withSession(async (req, res) => {
  await use(req, res, [isAjax, buildCalendar]);
  const { user } = req.session;
  const isCalendarEnabled = req.session.calendar.isEnabled;
  delete req.session.calendar;
  const avbx = container.resolve("avbx");
  const cache = container.resolve("cacheService");
  await cache.hdel(req.session.user.email, "calendar");
  if (!isCalendarEnabled) {
    const { email } = user;
    const lastUpdated = new Date(user.lastUpdated);
    avbx
      .on(email)
      .then(() => lastUpdated <= avbx.dynamo.calendar.daysAgo(1))
      .then((isDueForUpdate) => {
        if (isDueForUpdate) {
          avbx.touch(email).then(() => {
            req.session.user.lastUpdated = avbx.dynamo.calendar.now();
          });
        }
      });
  } else {
    avbx.off(user.email);
  }
  if (req.isAjax) {
    await req.buildCalendar();
    return res.json(req.session.calendar);
  } else {
    return redirect(res, `/calendar`);
  }
});
