require('dotenv').config();
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
        process.env.MONGO_URI,
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
