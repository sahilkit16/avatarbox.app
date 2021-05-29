import { container } from "../../Common/di-container";
import ShortId from "shortid";
import {
  use,
  isAjax,
  source,
  isAuthenticated,
  gravatarClientScope,
} from "../middleware";
import { GravatarStrategy } from "../../Application/build-calendar.gravatar";
import { TwitterStrategy } from "../../Application/build-calendar.twitter";

async function buildCalendarMiddleware(req, res, next) {
  let { calendar } = req.session;

  if (calendar) return next(calendar);

  await use(req, res, [isAuthenticated, isAjax, gravatarClientScope, source]);
  req.session.passport.user.cacheBuster = ShortId();
  let buildCalendarUseCase = container.resolve("buildCalendar");

  let strategy = null;

  if (req.source == "gravatar") {
    const client = req.scope && req.scope.resolve("gravatarClient");
    strategy = new GravatarStrategy();
    strategy.rpcClient = client;
  } else if (req.source == "twitter") {
    strategy = new TwitterStrategy();
    strategy.id = req.session.passport.user.id;
  }

  buildCalendarUseCase.strategy = strategy;

  buildCalendarUseCase.onError((error) => {
    if (req.isAjax) {
      return res.end();
    }
    next(error);
  });

  calendar = await buildCalendarUseCase.execute();

  req.session.calendar = calendar;

  next(calendar);
}

export const buildCalendar = buildCalendarMiddleware;
