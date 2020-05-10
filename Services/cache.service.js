const RedisClient = require("../Infrastructure/redis.client");

class CacheService {
  constructor() {
    this._cache = new RedisClient();
  }
  async get(value) {
    const _value = await this._cache.get(value);
    return JSON.parse(_value);
  }
  async set(key, value) {
    return await this._cache.set(key, JSON.stringify(value));
  }
  async delete(key) {
    return await this._cache.delete(key);
  }
}

module.exports = CacheService;
