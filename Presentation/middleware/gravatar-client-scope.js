const { createContainer, asValue } = require("awilix");
const { GravatarClient } = require("grav.client");
const container = require("../../Common/di-container");
const { _handleUnauthorized } = require("./unauthorized");

async function gravatarClientScope(req, res, next) {
  const _unauthorized = (err) => {
    console.log(err);
    _handleUnauthorized(req, res);
  };
  req.scope = createContainer().createScope();

  const { user } = req.session;
  const email = req.body && req.body.email;
  if (user) {
    const avbx = container.resolve("avbx");
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

module.exports = gravatarClientScope;
