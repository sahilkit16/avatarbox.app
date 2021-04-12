import redis from "redis";
import * as ConnectRedis from "connect-redis";
import { expressSession } from "next-session";
import { config } from "dotenv";

config();

export class RedisClient {
  constructor() {
    this.client = redis.createClient(process.env.REDIS_URI);
    const RedisStore = ConnectRedis(expressSession);
    this.store = new RedisStore({ client: this.client });
    this.client.on("error", (error) => {
      console.log(error);
    });
  }

  async set(key, value) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, (err, reply) => {
        if (err) reject(err);
        resolve(reply);
      });
    });
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, reply) => {
        if (err) reject(err);
        resolve(reply);
      });
    });
  }

  async delete(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err, reply) => {
        if (err) reject(err);
        resolve(reply);
      });
    });
  }

  async hset(key, field, value) {
    return new Promise((resolve, reject) => {
      this.client.hset(key, field, value, (err, reply) => {
        if (err) reject(err);
        resolve(reply);
      });
    });
  }

  async hget(key, field) {
    return new Promise((resolve, reject) => {
      this.client.hget(key, field, (err, reply) => {
        if (err) reject(err);
        resolve(reply);
      });
    });
  }

  async hdel(key, field) {
    return new Promise((resolve, reject) => {
      this.client.hdel(key, field, (err, reply) => {
        if (err) reject(err);
        resolve(reply);
      });
    });
  }

  expire(key, seconds) {
    this.client.expire(key, seconds);
  }
  end() {
    this.client.end(true);
  }
}
