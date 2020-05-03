import { Schema, model } from 'mongoose';
import { CalendarSchema } from './calendar.repo';

const UserSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  calendars: [CalendarSchema]
});

export const UserRepo = model('Users', UserSchema);
