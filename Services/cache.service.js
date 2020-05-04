const _cache = {};

// TODO: implement using redis client

class CacheService {
  get(value) {
    return _cache[value];
  }
  set(key, value) {
    _cache[key] = value;
  }
}

module.exports = CacheService;
