const RedisClient = require("../Infrastructure/redis.client");

const _cache = {};

class CacheService {
  constructor() {
    this._cache = new RedisClient();
  }
  get(value) {
    return _cache[value];
  }
  set(key, value) {
    _cache[key] = value;
  }
  remove(key) {
    delete _cache[key];
  }
}

module.exports = CacheService;
