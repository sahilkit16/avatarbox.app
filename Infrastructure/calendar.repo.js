const { Schema, model } = require("mongoose");

const CalendarSchema = new Schema({
  name: { type: String, required: true, default: "Daily" },
  isEnabled: { type: Boolean, required: true },
  isFailing: {
    default: false,
    type: Boolean,
    required: true,
  },
  createdAt: {
    default: new Date(),
    type: Date,
    required: true,
  },
  lastUpdated: {
    default: new Date(),
    type: Date,
    required: true,
  },
});

const CalendarRepo = model("Calendars", CalendarSchema);

module.exports = {
  CalendarRepo,
  CalendarSchema
};
