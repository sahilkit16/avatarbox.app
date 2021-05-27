import { createContainer, asValue } from "awilix";
import { GravatarClient } from "grav.client";
import { container } from "../../Common/di-container";
import { _handleUnauthorized } from "./unauthorized";

export async function gravatarClientScope(req, res, next) {
  const _unauthorized = (err) => {
    console.log(err);
    _handleUnauthorized(req, res);
  };
  req.scope = createContainer().createScope();
  const user = req.session.passport && req.session.passport.user;
  const email = req.body && req.body.email;

  // TODO: use source field to determine provider (instagram/gravatar/twitter)
  if (user && user.email) {
    const avbx = container.resolve("gravatarClient");
    avbx
      .fetch(user.email)
      .then((client) => {
        req.scope.register({
          gravatarClient: asValue(client),
        });
        next();
      })
      .catch(_unauthorized);
  } else if (email && req.method == "POST") {
    req.scope.register({
      gravatarClient: asValue(new GravatarClient(email, null)),
    });
    next();
  } else {
    return next();
  }
}
