import { use, passportTwitter } from "../../../../middleware";
import { container } from "../../../../../Common/di-container";
import { withSession } from "next-session";
import { AvbxTwitterClient } from "avatarbox.sdk";

const handler = async (req, res) => {
  await use(req, res, [
    passportTwitter.initialize(),
  ]);
  passportTwitter.authenticate("twitter", async function (err, user, info) {
    if (err) {
      throw err;
    }
    if (!user) {
      return res.redirect("/");
    }
    req.session.passport = {
      user: await signIn(user)
    };
    return res.redirect("/calendar");
  })(req, res);
};

async function signIn(user){
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
  
  // TODO:
  // return await twitterClient.sync(twitterProfile)
  // this change will be in avatarbox.sdk@1.2.4 (currently 1.2.3)
    
  await twitterClient.sync(twitterProfile);
  return twitterProfile;
}

const cache = container.resolve("cacheService");

export default withSession(handler, {
  store: cache.redis.store,
});
