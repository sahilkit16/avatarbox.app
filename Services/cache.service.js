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
    return await this._cache.set(key, value);
  }
  async delete(key) {
    return await this._cache.delete(key);
  }
  async hset(key, field, value) {
    return await this._cache.hset(key, field, value);
  }
  async hget(key, field) {
    return await this._cache.hget(key, field);
  }
  async hdel(key, field) {
    return await this._cache.hdel(key, field);
  }
  saveThanksPage(emailHash) {
    const key = `thanks-${emailHash}`;
    this.set(key, true);
    this._cache.expire(key, 60);
  }
  async touchSession(emailHash) {
    const activeSessionKeyName = "hasActiveSession";
    const activeSessionTTLSeconds = 120;
    const hasActiveSession =
      (await this.hget(emailHash, activeSessionKeyName)) || true;
    this.hset(emailHash, activeSessionKeyName, hasActiveSession);
    this._cache.expire(emailHash, activeSessionTTLSeconds);
    return hasActiveSession;
  }
}

module.exports = CacheService;
