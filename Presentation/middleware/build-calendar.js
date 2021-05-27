import { container } from "../../Common/di-container";
import ShortId from "shortid";
import {
  use,
  isAuthenticated,
  isAjax,
  gravatarClientScope,
} from "../middleware";
import { GravatarStrategy } from "../../Application/build-calendar.gravatar";
import { TwitterStrategy } from "../../Application/build-calendar.twitter";

export async function buildCalendar(req, res, next) {
  await use(req, res, [isAuthenticated, isAjax, gravatarClientScope]);
  req.session.passport.user.cacheBuster = ShortId();
  let buildCalendar = container.resolve("buildCalendar");

  // TODO: use source field to determine provider (instagram/gravatar/twitter)
  if (req.scope.registrations["gravatarClient"]) {
    const client = req.scope && req.scope.resolve("gravatarClient");
    buildCalendar.strategy = new GravatarStrategy();
    buildCalendar.strategy.rpcClient = client;
  } else {
    buildCalendar.strategy = new TwitterStrategy();
    buildCalendar.strategy.profile = req.session.passport.user;
  }

  buildCalendar.onError((error) => {
    if (req.isAjax) {
      return res.end();
    }
    next(error);
  });

  const calendar = await buildCalendar.execute();
  req.session.calendar = calendar;
  next(calendar);
}
