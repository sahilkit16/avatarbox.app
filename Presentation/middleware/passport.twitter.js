import * as passport from "passport";
import * as TwitterStrategy from "passport-twitter";
import { AvbxTwitterClient } from "avatarbox.sdk";

var strategy = new TwitterStrategy(
  {
    userAuthorizationURL: "https://api.twitter.com/oauth/authorize",
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK_URL,
  },
  function (token, tokenSecret, profile, done) {
    profile.token = token;
    profile.tokenSecret = tokenSecret;
    return done(null, profile);
  }
);

passport.use(strategy);

passport.serializeUser(async function (user, done) {
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
  await twitterClient.sync(twitterProfile);
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

export const passportTwitter = passport;
