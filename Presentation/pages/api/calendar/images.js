import { withSession } from "next-session";
import { use, buildCalendar } from "../../../middleware";

export default withSession(async (req, res) => {
  await use(req, res, [buildCalendar]);
  const calendar = await req.buildCalendar();
  res.json(calendar.images);
});
