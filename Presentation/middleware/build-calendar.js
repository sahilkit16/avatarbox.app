const { container } = require("../../Common/di-container");
const ImageShortageVM = require("../view-models/image-shortage.vm");
const ImageShortageError = require("../../Domain/image-shortage.error");
const ShortId = require("shortid");
import { use, gravatarClientScope, isAjax } from "../middleware";
const logger = container.resolve("logger");

export async function buildCalendar(req, res, next) {
  await use(req, res, [isAjax, gravatarClientScope]);
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
            res.redirect("/");
          }
        } else {
          next(err);
        }
      });
  };
  req.session.calendar = await req.buildCalendar();
  next();
}
