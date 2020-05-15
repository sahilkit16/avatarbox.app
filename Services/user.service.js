const UserRepo = require("../Infrastructure/user.repo");
const MissingCalendarError = require('../Domain/missing-calendar.error');

class UserService {
  constructor({ logger }){
    this.logger = logger;
  }
  get(email) {
    return new Promise((resolve, reject) => {
      UserRepo.findOne({ email }, (err, user) => {
        if (err) return reject(err);
        resolve(user);
      });
    });
  }
  findOrCreate(email, ciphertext) {
    return new Promise((resolve, reject) => {
      UserRepo.findOneAndUpdate(
        { email },
        { ciphertext },
        { new: true },
        (err, user) => {
          if (err) return reject(err);
          if (user) {
            resolve(user);
          } else {
            UserRepo.create({ email, ciphertext }, (_err, _user) => {
              if (_err) return reject(_err);
              _user.isNew = true;
              resolve(_user);
            });
          }
        }
      );
    });
  }
  toggleCalendar(email, isEnabled) {
    return new Promise((resolve, reject) => {
      UserRepo.updateOne(
        { email, calendars: { $elemMatch: { name: "Daily" } } },
        { $set: { "calendars.$.isEnabled": !isEnabled } },
        (err, status) => {
          if (err) {
            this.logger.error(err.message);
            return reject(err);
          }
          
          //TODO: use logic to create helper function
          const didToggleCalendar = (status.ok == 1 && status.n == 1 && status.nModified == 1);
          const didNotModify = (status.ok == 1 && status.n == 1 && status.nModified == 0);
          const didNotFind = (status.ok == 1 && status.n == 0 && status.nModified == 0);

          if (didToggleCalendar) {
            resolve(didToggleCalendar);
            this.logger.info("calendar updated successfully");
          } else if(didNotModify) {
            this.logger.warn("calendar was not modified");
            resolve(didNotModify);
          } else if(didNotFind) {
            this.logger.crit("calendar not found");
            reject(new MissingCalendarError());
          } else {
            const message = `calendar update failed | ${status}`;
            this.logger.error(message);
            reject(new Error(message));
          }
        }
      );
    });
  }
}

module.exports = UserService;
