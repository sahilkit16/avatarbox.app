const container = require("../../Common/di-container");

const cacheService = container.resolve("cacheService");

async function sessionWatcher(req, res, next) {
  const { user } = req.session;
  if (user) {
    await cacheService.touchSession(user.hash);
  }
  next();
}

module.exports = sessionWatcher;
