const UserRepo = require("../Infrastructure/user.repo");

class UserService {
  get(email) {
    return new Promise((resolve, reject) => {
      UserRepo.findOne({ email }, (err, user) => {
        if (err) return reject(err);
        resolve(user);
      });
    });
  }
  create(email, ciphertext) {
    return new Promise((resolve, reject) => {
      UserRepo.findOne({ email }, (err, user) => {
        if (err) return reject(err);
        if (user) {
          resolve(user);
        } else {
          UserRepo.create({ email, ciphertext }, (_err, _user) => {
            if (err) return reject(err);
            _user.isNew = true;
            resolve(_user);
          });
        }
      });
    });
  }
  toggleCalendar(email, isEnabled) {
    return new Promise((resolve, reject) => {
      UserRepo.updateOne(
        { email, calendars: { $elemMatch: { "name" : "Daily" } } }, 
        { $set: { "calendars.$.isEnabled": !isEnabled } }, 
        (err, user) => {
          if (err) return reject(err);
          if (user) {
            resolve(user);
          } else {
            reject(`calendar not found for ${email}`);
        }
      });
    });
  }
}

module.exports = UserService;
