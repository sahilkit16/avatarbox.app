import { use, passportTwitter } from "../../../../middleware";
import { container } from "../../../../../Common/di-container";
import { withSession } from "next-session";
import { AvbxTwitterClient } from "avatarbox.sdk";
import { withSentry } from "@sentry/nextjs";

const handler = async (req, res) => {
  await use(req, res, [passportTwitter.initialize()]);
  passportTwitter.authenticate("twitter", async function (err, user) {
    if (err) {
      throw err;
    }
    if (!user) {
      return res.redirect("/");
    }
    req.session.passport = {
      user: await signIn(user),
    };
    return res.redirect("/calendar");
  })(req, res);
};

async function signIn(user) {
  const { token, tokenSecret } = user;
  const twitterClient = new AvbxTwitterClient(token, tokenSecret);
  const twitterProfile = {
    id: user.id,
    username: user.username,
    token,
    tokenSecret,
  };

  if (user.photos && Array.isArray(user.photos)) {
    twitterProfile.avatars = user.photos.map((photo) => {
      if (photo.value) {
        return photo.value.replace("_normal.", ".");
      }
    });
  }

  return await twitterClient.sync(twitterProfile);
}

const cache = container.resolve("cacheService");

export default withSentry(
  withSession(handler, {
    store: cache.redis.store,
  })
);
