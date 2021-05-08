import * as passport from "passport";
import * as TwitterStrategy from "passport-twitter";

var strategy = new TwitterStrategy(
  {
    userAuthorizationURL: 'https://api.twitter.com/oauth/authorize',
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK_URL
  },
  function (token, tokenSecret, profile, done) {
    console.log('token: ', token);
    console.log('tokenSecret: ', tokenSecret);
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
);

passport.use(strategy);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

export const passportMiddleware = passport;
