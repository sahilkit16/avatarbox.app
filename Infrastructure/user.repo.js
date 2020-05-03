const { Schema, model } = require("mongoose");
const { CalendarSchema } = require("./calendar.repo");

const UserSchema = new Schema({
  email: { type: String, required: true },
  ciphertext: { type: String, required: true },
  calendars: [CalendarSchema],
});

const UserRepo = model("Users", UserSchema);

module.exports = UserRepo;
