import ACTION_TYPES from "./action-types";
import { isJson } from "../../Common/helpers";
const ImageShortageError = require("../../Domain/image-shortage.error");
const { NoImages, SingleImage } = require("../../Domain/error-code");

export const updateCalendar = () => (dispatch) => {
  return fetch("/calendar/submit", {
    method: "POST",
    headers: {
      accept: "application/json",
    },
  })
    .then(async (res) => {
      if (res.ok) {
        return await res.json();
      } else {
        const text = await res.text();
        if (isJson(text)) {
          const err = JSON.parse(text);
          if (err.code == NoImages || err.code == SingleImage) {
            throw new ImageShortageError(err.code);
          }
        } else {
          throw new Error(text || res.statusText);
        }
      }
    })
    .then((calendar) => {
      dispatch({
        type: ACTION_TYPES.UPDATE_CALENDAR,
        calendar,
      });
    });
};

export const updateUser = (user) => {
  return {
    type: ACTION_TYPES.UPDATE_USER,
    user,
  };
};
