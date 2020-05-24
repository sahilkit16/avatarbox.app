const RedisClient = require("../Infrastructure/redis.client");

const sessionCountKeyName = "sessionCount";

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
  async hset(key, field, value) {
    return await this._cache.hset(key, field, JSON.stringify(value));
  }
  async hget(key, field) {
    return await this._cache.hget(key, field);
  }
  async hdel(key, field) {
    return await this._cache.hdel(key, field);
  }
  async incrementSessionCount(emailHash){
    let sessionCount = await this.hget(emailHash, sessionCountKeyName) || 0;
    sessionCount = Number(sessionCount) + 1;
    this.hset(emailHash, sessionCountKeyName, sessionCount);
    return sessionCount;
  }
  async decrementSessionCount(emailHash){
    let sessionCount = await this.hget(emailHash, sessionCountKeyName) || 0;
    if(sessionCount == 0){
      this.hdel(emailHash, sessionCountKeyName);
      return null;
    } else {
      sessionCount = Number(sessionCount) - 1;
      this.hset(emailHash, sessionCountKeyName, sessionCount);
      return sessionCount;
    }
  }
}

module.exports = CacheService;
