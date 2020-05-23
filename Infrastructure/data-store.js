const mongoose = require("mongoose");
const Logger = require("../Common/logger");

class DataStore {
  constructor(logger = new Logger()) {
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
            reject(new Error("db connection failed"));
          } else {
            this.logger.notice("db connected");
            resolve(true);
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
