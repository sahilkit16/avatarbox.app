import { container } from "../../../Common/di-container";
import { withSession } from "next-session";
import { withSentry } from "@sentry/nextjs";
import { S3Service } from "avatarbox.sdk/Release/Services/s3.service";

const handler = async (req, res) => {
  const { fileName } = req.query;
  const { user } = req.session.passport;
  const presignedPost = await S3Service.getPresignedPost(
    "icons.avatarbox.io",
    `u/${user.id}/${fileName}`
  );
  res.json(presignedPost);
};

const cache = container.resolve("cacheService");

export default withSentry(
  withSession(handler, {
    store: cache.redis.store,
  })
);
