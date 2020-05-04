const { createContainer, asValue } = require("awilix");
const { GravatarClient } = require("grav.client");
const { container } = require("../../Common/di-container");

async function gravatarClientScope(req, res, next) {
  req.scope = createContainer().createScope();
  if (req.method == "POST") {
    const { email } = req.body || {};
    req.scope.register({
      gravatarClient: asValue(new GravatarClient(email, null)),
    });
  } else if (req.method == "GET") {
    const { user } = req.session;
    const rsaService = container.resolve("rsaService");
    const password = await rsaService.decrypt(user.password);
    req.scope.register({
      gravatarClient: asValue(new GravatarClient(user.email, password)),
    });
  }
  next();
}

module.exports = gravatarClientScope;
