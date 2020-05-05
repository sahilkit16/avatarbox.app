const redis = require("redis");

class RedisClient {
  constructor() {
    this._client = redis.createClient({ host: "avatarbox" });
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
}

module.exports = RedisClient;
