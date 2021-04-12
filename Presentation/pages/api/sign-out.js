import { withSession } from "next-session";
import { redirect } from "next/dist/next-server/server/api-utils";
import { container } from "../../../Common/di-container";

const cache = container.resolve("cacheService");

export default withSession(
  async (req, res) => {
    if (req.session) req.session.destroy();
    redirect(res, "/");
  },
  { store: cache.redis.store }
);
