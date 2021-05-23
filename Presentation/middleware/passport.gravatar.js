import * as passport from "passport";
import * as LocalStrategy from "passport-local";
import { container } from "../../Common/di-container";

var strategy = new LocalStrategy(async function (username, password, done) {
  const avbx = container.resolve("avbx");
  const client = await avbx.login(username, password);
  if (!client) {
    return done(null, false, { message: "Invalid username or password." });
  }
  return done(null, client);
});

passport.use(strategy);

export const passportGravatar = passport;
