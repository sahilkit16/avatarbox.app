import ACTION_TYPES from "./action-types";
import CrashReporter from "../../Common/crash-reporter.client";

const crashReporter = new CrashReporter();

export const updateCalendar = () => (dispatch) => {
  return fetch("/calendar/submit", {
    method: "POST",
    headers: {
      accept: "application/json",
    },
  })
  .then(async (res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(res.textStatus);
    }
  })
  .then(calendar => {
    dispatch({
      type: ACTION_TYPES.UPDATE_CALENDAR,
      calendar,
    })
  })
  .catch(err => {
    crashReporter.submit(err);
  });
};

export const updateUser = (user) => {
  return {
    type: ACTION_TYPES.UPDATE_USER,
    user,
  };
};
