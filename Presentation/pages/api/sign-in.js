import { container } from "../../../Common/di-container";
import { withSession } from "next-session";
import {
  use,
  isAjax,
  passportGravatar,
  gravatarClientScope,
} from "../../middleware";

const handler = async (req, res) => {
  await use(req, res, [
    isAjax,
    function (req, res, next) {
      req.flash = (err, message) => {
        req.session.validationMessage = message;
      };
      return next();
    },
    passportGravatar.initialize(),
    passportGravatar.authenticate("local", {
      successRedirect: "/calendar",
      failureRedirect: req.isAjax ? "/" : "/?next=1#here",
      failureFlash: true,
    }),
    gravatarClientScope,
  ]);
};

const cache = container.resolve("cacheService");

export default withSession(handler, {
  store: cache.redis.store,
});
