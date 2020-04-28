const _cache = {};

// TODO: implement using redis client

class CacheService {
    static get(value) {
        return _cache[value];
    }
    static set(key, value) {
        _cache[key] = value;
    }
}

module.exports = CacheService;
