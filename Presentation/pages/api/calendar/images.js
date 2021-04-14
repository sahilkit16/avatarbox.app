import { withSession } from "next-session";
import { container } from "../../../../Common/di-container";
import { use, buildCalendar, isAuthenticated } from "../../../middleware";

const cache = container.resolve("cacheService");

export default withSession(
  async (req, res) => {
    await use(req, res, [isAuthenticated, buildCalendar]);
    return res.json(req.session.calendar.images);
  },
  { store: cache.redis.store }
);
