const container = require("../../Common/di-container");

const cacheService = container.resolve("cacheService");

async function isOnline(req, res, next) {
  const { user } = req.session;
  if (user) {
    await cacheService.isOnline(user.hash);
  }
  next();
}

module.exports = isOnline;
