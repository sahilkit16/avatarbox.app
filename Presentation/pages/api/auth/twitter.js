import { use, passportTwitter } from "../../../middleware";
import { container } from "../../../../Common/di-container";
import { withSession } from "next-session";
import { withSentry } from "@sentry/nextjs";

const handler = async (req, res) => {
  await use(req, res, [
    passportTwitter.initialize(),
    passportTwitter.authenticate("twitter"),
  ]);
};

const cache = container.resolve("cacheService");

export default withSentry(
  withSession(handler, {
    store: cache.redis.store,
  })
);
