import ACTION_TYPES from "./action-types";
import ShortId from "shortid";
import * as fetch from "../../Infrastructure/fetch.client";

export const bustCache = () => ({
  type: ACTION_TYPES.BUST_CACHE,
  cacheBuster: ShortId(),
});

export const toggleCalendar = () => (dispatch) => {
  return fetch.toggleCalendar().then((calendar) => {
    dispatch({
      type: ACTION_TYPES.TOGGLE_CALENDAR,
      calendar,
    });
  });
};

export const reloadCalendar = () => (dispatch) => {
  return fetch.getCalendarImages().then((calendarImages) => {
    dispatch({
      type: ACTION_TYPES.RELOAD_CALENDAR,
      calendarImages,
    });
  });
};

export const updateUser = (user) => ({
  type: ACTION_TYPES.UPDATE_USER,
  user,
});
