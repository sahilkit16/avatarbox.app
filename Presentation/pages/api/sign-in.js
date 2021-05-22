import ShortId from "shortid";
import { LoginVM } from "../../view-models/login.vm";
import { container } from "../../../Common/di-container";
import { withSession } from "next-session";
import {
  use,
  isAjax,
  unauthorized,
  gravatarClientScope,
} from "../../middleware";
import { asValue } from "awilix";
import { redirect } from "next/dist/next-server/server/api-utils";

const handler = async (req, res) => {
  await use(req, res, [isAjax, unauthorized, gravatarClientScope]);

  let { password } = req.body;
  const loginVm = new LoginVM();
  loginVm.email = req.session.email || req.body.email;
  loginVm.password = password;

  if (loginVm.errors.email) {
    return req.unauthorized(loginVm.errors.email, "/");
  } else if (!req.isAjax && loginVm.errors.password) {
    return req.unauthorized(loginVm.errors.password, "/?next=1#here");
  }

  const user = { email: loginVm.email };

  if (user.email && password) {
    const avbx = container.resolve("avbx");
    const client = await avbx.login(user.email, password);

    if (!client) return req.unauthorized();

    user.hash = client.emailHash;
    user.cacheBuster = ShortId();
    const _user = await avbx.user.find(user.email);
    user.id = _user.id;
    user.lastUpdated = _user.lastUpdated;
    req.session.user = user;
    req.scope.register({
      gravatarClient: asValue(client),
    });

    if (req.isAjax) {
      return res.end();
    } else {
      return redirect(res, "/calendar");
    }
  } else {
    req.unauthorized();
  }
};

const cache = container.resolve("cacheService");

export default withSession(handler, {
  store: cache.redis.store,
});
