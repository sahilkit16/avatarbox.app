import { container } from "../../Common/di-container";
import { ImageShortageVM } from "../view-models/image-shortage.vm";
import { ImageShortageError } from "../../Domain/image-shortage.error";
import ShortId from "shortid";
import {
  use,
  isAuthenticated,
  isAjax,
  gravatarClientScope,
} from "../middleware";
import { redirect } from "next/dist/next-server/server/api-utils";

const logger = container.resolve("logger");
const cache = container.resolve("cacheService");

export async function buildCalendar(req, res, next) {
  await use(req, res, [isAuthenticated, isAjax, gravatarClientScope]);
  req.session.user.cacheBuster = ShortId();
  req.buildCalendar = () => {
    const client = req.scope.resolve("gravatarClient");
    const buildCalendar = container.resolve("buildCalendar");
    buildCalendar.client = client;
    return cache
      .hget(client.email, "calendar")
      .then((calendar) => {
        if (calendar) return calendar;
      })
      .then(async (calendar) => {
        if (calendar) return calendar;
        const _calendar = await buildCalendar.execute();
        await cache.hset(client.email, "calendar", _calendar);
        return _calendar;
      })
      .then((calendar) => {
        req.session.calendar = calendar;
      })
      .catch((err) => {
        if (err instanceof ImageShortageError) {
          req.session.prompt = new ImageShortageVM(err);
          if (req.isAjax) {
            return res
              .status(400)
              .json({ code: err.code, message: err.message });
          } else {
            redirect(res, "/");
          }
        } else {
          next(err);
        }
      });
  };
  await req.buildCalendar();
  next();
}
