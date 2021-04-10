import { withSession } from "next-session";
import { redirect } from "next/dist/next-server/server/api-utils";
import { container } from "../../../Common/di-container";

const cache = container.resolve("cacheService");

export default withSession(async (req, res) => {
  if (req.session.user) {
    await cache.hdel(req.session.user.email, "calendar");
  }
  req.session.destroy();
  redirect(res, "/");
});
