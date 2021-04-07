const { useMiddleware, runMiddleware } = require("../use-middleware");

import { withSession } from "next-session";
import buildCalendar from "../../../middleware/build-calendar";

export default withSession(async (req, res) => {
  await useMiddleware.call({ req, res });
  await runMiddleware(req, res, buildCalendar);
  const calendar = await req.buildCalendar();
  res.json(calendar.images);
});
