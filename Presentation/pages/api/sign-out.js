import { withSession } from "next-session";
import { withSentry } from "@sentry/nextjs";
import { redirect } from "next/dist/server/api-utils";
import { container } from "../../../Common/di-container";

const cache = container.resolve("cacheService");

export default withSentry(
  withSession(
    async (req, res) => {
      if (req.session) req.session.destroy();
      redirect(res, "/");
    },
    { store: cache.redis.store }
  )
);
