import { Schema, model } from "mongoose";

export const CalendarSchema = new Schema({
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

export const CalendarRepo = model("Calendars", CalendarSchema);
