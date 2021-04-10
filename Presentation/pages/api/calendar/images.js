import { withSession } from "next-session";
import { use, buildCalendar } from "../../../middleware";

export default withSession(async (req, res) => {
  await use(req, res, [buildCalendar]);
  return res.json(req.session.calendar.images);
});
