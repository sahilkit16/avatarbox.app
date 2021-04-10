import { LoginVM } from "../../view-models/login.vm";
import { withSession } from "next-session";
import {
  use,
  unauthorized,
  gravatarClientScope,
  isAjax,
} from "../../middleware";
import { redirect } from "next/dist/next-server/server/api-utils";

export default withSession(async (req, res) => {
  await use(req, res, [isAjax, unauthorized, gravatarClientScope]);
  const loginVm = new LoginVM();
  loginVm.email = req.body.email;

  if (loginVm.errors.email) {
    return req.unauthorized(loginVm.errors.email);
  }

  let redirectUrl = "/";
  const client = req.scope.resolve("gravatarClient");
  if (client) {
    const userid = client.emailHash;
    req.session.userid = userid;
    req.session.email = loginVm.email;
    redirectUrl += `?next=1`;
  }
  if (!req.isAjax) {
    redirectUrl += "#here";
    redirect(res, redirectUrl);
  } else {
    res.end();
  }
});
