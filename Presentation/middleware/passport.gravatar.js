import * as passport from "passport";
import * as LocalStrategy from "passport-local";
import { LoginVM } from "../view-models/login.vm";
import ShortId from "shortid";
import { AvbxGravatarClient } from "avatarbox.sdk";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async function (username, password, done) {
      const loginVm = new LoginVM();
      loginVm.email = username;
      loginVm.password = password;
      const message = loginVm.errors.email || loginVm.errors.password;
      if (message) return done(null, false, { message });
      const avbx = new AvbxGravatarClient();
      const client = await avbx.login(username, password);
      if (!client)
        return done(null, false, { message: "Invalid username or password." });
      const user = { email: loginVm.email };
      user.hash = client.emailHash;
      user.cacheBuster = ShortId();
      return done(null, user);
    }
  )
);

passport.serializeUser(async function (user, done) {
  const avbx = new AvbxGravatarClient();
  const { id, lastUpdated } = await avbx.user.find(user.email);
  user.id = id;
  user.lastUpdated = lastUpdated;
  user.source = "gravatar";
  done(null, user);
});

export const passportGravatar = passport;
