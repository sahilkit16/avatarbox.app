import { ImageShortageError } from "../Domain/image-shortage.error";
import { ErrorCode } from "../Domain/error-code";
import { isJson } from "../Common/helpers";

const { NoImages, SingleImage } = ErrorCode;

export const signIn = (user) => {
  return new Promise((resolve, reject) => {
    fetch("/api/sign-in", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then(async (res) => {
      if (res.ok) {
        resolve(true);
      } else {
        const message = await res.text();
        reject(message || res.statusText);
      }
    });
  });
};

export const toggleCalendar = () => {
  return new Promise((resolve, reject) => {
    fetch("/api/calendar/submit", {
      method: "POST",
      headers: {
        accept: "application/json",
      },
    }).then(async (res) => {
      if (res.ok) {
        const calendar = await res.json();
        resolve(calendar);
      } else {
        const text = await res.text();
        if (isJson(text)) {
          const err = JSON.parse(text);
          if (err.code == NoImages || err.code == SingleImage) {
            reject(new ImageShortageError(err.code));
          }
        } else {
          reject(new Error(text || res.statusText));
        }
      }
    });
  });
};

export const getCalendarImages = () => {
  return new Promise((resolve, reject) => {
    fetch("/api/calendar/images").then(async (res) => {
      if (res.ok) {
        resolve(res.json());
      } else {
        const message = await res.text();
        reject(message || res.statusText);
      }
    });
  });
};
