import { use, passportMiddleware } from "../../../../middleware";
import { container } from "../../../../../Common/di-container";
import { withSession } from "next-session";

const handler = async (req, res) => {
  await use(req, res, [passportMiddleware.initialize()]);
  passportMiddleware.authenticate("twitter", function (err, user, info) {
    if (err) {
      throw err;
    }
    if (!user) {
      return res.redirect("/");
    }
    req.logIn(user, function (err) {
      if (err) {
        throw err;
      }
      res.redirect("/calendar");
    });
  })(req, res);
};

const cache = container.resolve("cacheService");

export default withSession(handler, {
  store: cache.redis.store,
});
