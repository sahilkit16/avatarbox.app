import { use, passportMiddleware } from "../../../../middleware";
import { container } from "../../../../../Common/di-container";
import { withSession } from "next-session";

const handler = async (req, res, next) => {
  passportMiddleware.authenticate('twitter', function (err, user, info) {
    if (err) { return next(err); }
    console.log(user);
    // if (!user) { return res.redirect('/'); }
    // req.logIn(user, function (err) {
    //   if (err) { return next(err); }
    //   res.redirect('/users');
    // });
  })(req, res, next);
}

const cache = container.resolve("cacheService");

export default withSession(handler, {
  store: cache.redis.store,
});