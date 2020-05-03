const { Schema, model } = require("mongoose");
const CalendarSchema = require("./calendar.schema");

const UserSchema = new Schema({
  email: { type: String, required: true },
  ciphertext: { type: String, required: true },
  calendars: {
    default: [{
      name: "Daily",
      isEnabled: false,
      isFailing: false,
      createdAt: new Date(),
      lastUpdated: new Date(),
    }],
    type: [CalendarSchema],
    required: true,
  },
});

const UserRepo = model("Users", UserSchema);

module.exports = UserRepo;
