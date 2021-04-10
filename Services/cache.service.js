import { RedisClient } from "../Infrastructure/redis.client";

export class CacheService {
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
  disconnect() {
    this._cache.end();
  }
}
