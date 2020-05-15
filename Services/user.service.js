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
          if (err) return reject(err);
          if (status.ok == status.nModified == 1) {
            resolve(status);
          } else {
            reject(`calendar not found for ${email}`);
          }
        }
      );
    });
  }
}

module.exports = UserService;
