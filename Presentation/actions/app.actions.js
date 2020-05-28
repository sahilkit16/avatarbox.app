import ACTION_TYPES from "./action-types";

export const updateCalendar = (calendar) => {
  return {
    type: ACTION_TYPES.UPDATE_CALENDAR,
    calendar,
  };
};

export const updateUser = (user) => {
  return {
    type: ACTION_TYPES.UPDATE_USER,
    user,
  };
};
