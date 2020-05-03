const UserRepo = require('../Infrastructure/user.repo');
const { CalendarSchema } = require('../Infrastructure/calendar.schema');

class UserService {
  create(email, ciphertext) {
    return new Promise((resolve, reject) => {
      UserRepo.findOne({ email }, (err, user) => {
        if (err) return reject(err);
        if (user) {
          resolve(user);
        } else {
          UserRepo.create({ email, ciphertext }, (_err, _user) => {
            if (err) return reject(err);
            resolve(_user);
          })
        }
      })
    })
  }
}

module.exports = UserService;