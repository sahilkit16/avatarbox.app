import { container } from "../../Common/di-container";
import ShortId from "shortid";
import {
  use,
  isAuthenticated,
  isAjax,
  gravatarClientScope,
} from "../middleware";

export async function buildCalendar(req, res, next) {
  await use(req, res, [isAuthenticated, isAjax, gravatarClientScope]);
  req.session.user.cacheBuster = ShortId();
  const client = req.scope.resolve("gravatarClient");
  const buildCalendar = container.resolve("buildCalendar");
  buildCalendar.client = client;
  buildCalendar
    .execute()
    .then((calendar) => {
      req.session.calendar = calendar;
      next(calendar);
    })
    .catch((err) => next(err));
}
