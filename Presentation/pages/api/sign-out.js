import { withSession } from "next-session";
import { redirect } from "next/dist/next-server/server/api-utils";

export default withSession((req, res) => {
  req.session.destroy();
  redirect(res, "/");
});
