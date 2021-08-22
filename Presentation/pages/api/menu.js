import { container } from "../../../Common/di-container";
import { withSession } from "next-session";
import {
  use,
  source,
  runMiddleware,
  buildCalendar,
  gravatarClientScope,
} from "../../middleware";
import { redirect } from "next/dist/server/api-utils";
import { AvatarCollection } from "../../../Common/avatar-collection";

const handler = async (req, res) => {
  await use(req, res, [source, gravatarClientScope]);
  req.session.calendar = null;
  if (req.body && req.body.imageUrl) {
    await uploadIcon(req, res);
  } else if (req.body && req.body.selectedIcon) {
    await deleteIcon(req, res);
  }
  await runMiddleware(req, res, buildCalendar);
  if (res.headersSent) return;
  redirect(res, "/avatars");
};

async function deleteIcon(req, res) {
  if (!req.body || !req.body.selectedIcon) return;
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
}

async function uploadIcon(req, res) {
  if (!req.body || !req.body.imageUrl) return;
  const { imageUrl } = req.body;
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
  await avatars.add(imageUrl);
}

const cache = container.resolve("cacheService");

export default withSession(handler, {
  store: cache.redis.store,
});
