const _cache = {};

// TODO: implement using redis client

class CacheService {
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
