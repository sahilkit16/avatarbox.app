require('dotenv').config();
const redis = require("redis");

class RedisClient {
  constructor() {
    this._client = redis.createClient(process.env.REDIS_URL);
    this._client.on("error", (error) => {
      console.log(error);
    });
  }

  async set(key, value) {
    return new Promise((resolve, reject) => {
      this._client.set(key, value, (err, reply) => {
        if (err) reject(err);
        resolve(reply);
      });
    });
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this._client.get(key, (err, reply) => {
        if (err) reject(err);
        resolve(reply);
      });
    });
  }

  async delete(key) {
    return new Promise((resolve, reject) => {
      this._client.del(key, (err, reply) => {
        if (err) reject(err);
        resolve(reply);
      });
    });
  }

  async hset(key, field, value) {
    return new Promise((resolve, reject) => {
      this._client.hset(key, field, value, (err, reply) => {
        if (err) reject(err);
        resolve(reply);
      });
    });
  }

  async hget(key, field) {
    return new Promise((resolve, reject) => {
      this._client.hget(key, field, (err, reply) => {
        if (err) reject(err);
        resolve(reply);
      });
    });
  }

  async hdel(key, field) {
    return new Promise((resolve, reject) => {
      this._client.hdel(key, field, (err, reply) => {
        if (err) reject(err);
        resolve(reply);
      });
    });
  }

  expire(key, seconds) {
    this._client.expire(key, seconds);
  }
  end() {
    this._client.end(true);
  }
}

module.exports = RedisClient;
