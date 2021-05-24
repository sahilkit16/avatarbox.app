import * as passport from "passport";
import * as TwitterStrategy from "passport-twitter";

passport.use(new TwitterStrategy(
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
));

export const passportTwitter = passport;
