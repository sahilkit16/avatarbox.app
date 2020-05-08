const { createContainer, asValue } = require("awilix");
const { GravatarClient } = require("grav.client");
const { container } = require("../../Common/di-container");
const { _handleUnauthorized } = require("./unauthorized");

async function gravatarClientScope(req, res, next) {
  const _unauthorized = (err) => {
    console.log(err);
    _handleUnauthorized(req, res);
  } 
  req.scope = createContainer().createScope();
  if (req.method == "POST") {
    const { email } = req.body || {};
    req.scope.register({
      gravatarClient: asValue(new GravatarClient(email, null)),
    });
    next();
  } else if (req.method == "GET") {
    const { user } = req.session;
    const rsaService = container.resolve("rsaService");
    rsaService.decrypt(user.password).then(password => {
      return new GravatarClient(user.email, password);
    })
    .then(client => {
      client.exists()
        .then(() => {
          req.scope.register({
            gravatarClient: asValue(client),
          });
          next();
        })
        .catch(_unauthorized)
    }).catch(_unauthorized)
  }
}

module.exports = gravatarClientScope;
