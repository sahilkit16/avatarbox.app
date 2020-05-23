const mongoose = require("mongoose");

class DataStore {
  constructor({ logger }) {
    this.logger = logger;
  }
  async connect() {
    // https://mongoosejs.com/docs/deprecations.html#findandmodify
    mongoose.set("useFindAndModify", false);
    return new Promise((resolve, reject) => {
      mongoose.connect(
        `mongodb://avatarbox:27017/avbx`,
        { useNewUrlParser: true, useUnifiedTopology: true },
        (error) => {
          if (error) {
            reject(error);
          } else {
            this.logger.notice("db connected");
            resolve(this);
          }
        }
      );
    });
  }
  async disconnect(done) {
    mongoose.disconnect();
    if (done) done();
    this.logger.warn("db disconnected");
  }
}

module.exports = DataStore;
