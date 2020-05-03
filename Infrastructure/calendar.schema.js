const { Schema } = require("mongoose");

const CalendarSchema = new Schema({
  name: { type: String, required: true },
  isEnabled: { type: Boolean, required: true },
  isFailing: {type: Boolean,required: true },
  createdAt: {type: Date,required: true },
  lastUpdated: {type: Date,required: true },
});

module.exports = CalendarSchema;
