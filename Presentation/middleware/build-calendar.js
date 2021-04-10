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

export async function buildCalendar(req, res, next) {
  await use(req, res, [isAuthenticated, isAjax, gravatarClientScope]);
  req.session.user.cacheBuster = ShortId();
  req.buildCalendar = () => {
    const buildCalendar = container.resolve("buildCalendar");
    buildCalendar.client = req.scope.resolve("gravatarClient");
    return buildCalendar
      .execute()
      .then((calendar) => calendar)
      .catch((err) => {
        logger.error(err.message);
        if (err instanceof ImageShortageError) {
          req.session.prompt = new ImageShortageVM(err);
          if (req.isAjax) {
            res.status(400).json({ code: err.code, message: err.message });
          } else {
            redirect(res, "/");
          }
        } else {
          next(err);
        }
      });
  };
  req.session.calendar = await req.buildCalendar();
  next();
}
