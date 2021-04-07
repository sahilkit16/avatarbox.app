import { withSession } from "next-session";

export default withSession((req, res) => {
  req.session.destroy();
  res.redirect("/");
});
