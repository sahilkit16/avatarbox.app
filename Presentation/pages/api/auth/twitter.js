import { use, passportMiddleware } from "../../../middleware";
import { container } from "../../../../Common/di-container";
import { withSession } from "next-session";

const handler = async (req, res) => {
  await use(req, res, [
    passportMiddleware.initialize(),
    passportMiddleware.authenticate("twitter"),
  ]);
};

const cache = container.resolve("cacheService");

export default withSession(handler, {
  store: cache.redis.store,
});
