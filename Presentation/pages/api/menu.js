import { container } from "../../../Common/di-container";
import { withSession } from "next-session";
import {
  use,
  source,
  runMiddleware,
  buildCalendar,
  gravatarClientScope,
} from "../../middleware";
import { redirect } from "next/dist/next-server/server/api-utils";
import { AvatarCollection } from "../../../Common/avatar-collection";

const handler = async (req, res) => {
  await use(req, res, [source, gravatarClientScope]);
  if (/post/i.test(req.method)) {
    if (req.body && req.body.selectedIcon) {
      req.session.calendar = null;
      const { selectedIcon } = req.body;
      const avatars = new AvatarCollection(req.source);
      switch (req.source) {
        case "gravatar":
          avatars.client = req.scope.resolve("gravatarClient");
          break;
        case "twitter":
          avatars.userId = req.session.passport.user.id;
          break;
        default:
          break;
      }
      await avatars.delete(selectedIcon);
      await runMiddleware(req, res, buildCalendar);
    }
  }
  if (res.headersSent) return;
  redirect(res, "/avatars");
};

const cache = container.resolve("cacheService");

export default withSession(handler, {
  store: cache.redis.store,
});
