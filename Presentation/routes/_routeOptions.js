const RsaService = require('../../Services/rsa.service');
const BuildCalendarUseCase = require('../../Application/build-calendar.use-case');
const { GravatarClient } = require("grav.client");
const UserService = require("../../Services/user.service");
const CacheService = require("../../Services/cache.service");

const cache = new CacheService();
const user = new UserService();
const rsa = new RsaService();

exports.Calendar = class CalendarRouteOptions {
  constructor(){
    this.buildCalendar = new BuildCalendarUseCase();
    this.cache = cache;
    this.rsa = rsa;
    this.user = user;
    this.useGravatarClient = (email, password) => {
      this.client = new GravatarClient(email, password);
      return this.client;
    }
  }
}

exports.Encrypt = class EncryptRouteOptions {
  constructor(){
    this.rsa = rsa;
  }
}

exports.Home = class HomeRouteOptions {
  constructor(){
    this.cache = cache;
    this.user = user;
    this.useGravatarClient = (email, password) => {
      this.client = new GravatarClient(email, password);
      return this.client;
    }
  }
}