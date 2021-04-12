import { RedisClient } from "../Infrastructure/redis.client";
import { isJson } from "../Common/helpers";

export class CacheService {
  constructor() {
    this.redis = new RedisClient();
  }
  unbox(value) {
    const jsonValue = isJson(value);
    if (jsonValue) return jsonValue;
    if (value instanceof Date) return value;
    if (!isNaN(value)) return Number(value);
    return value;
  }
  box(value) {
    if (value instanceof Date) return value;
    if (value instanceof Object) return JSON.stringify(value);
    if (!isNaN(value)) return value.toString();
    return value;
  }
  async get(key) {
    const value = await this.redis.get(key);
    return this.unbox(value);
  }
  async set(key, value) {
    return await this.redis.set(key, this.box(value));
  }
  async delete(key) {
    return await this.redis.delete(key);
  }
  async hset(key, field, value) {
    return await this.redis.hset(key, field, this.box(value));
  }
  async hget(key, field) {
    const value = await this.redis.hget(key, field);
    return this.unbox(value);
  }
  async hdel(key, field) {
    return await this.redis.hdel(key, field);
  }
  disconnect() {
    this.redis.end();
  }
}
