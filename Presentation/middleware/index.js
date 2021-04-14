import { redirect } from "next/dist/next-server/server/api-utils";
import { ImageShortageError } from "../../Domain/image-shortage.error";
import { ImageShortageVM } from "../view-models/image-shortage.vm";

export * from "./build-calendar";
export * from "./crash-reporter-scope";
export * from "./gravatar-client-scope";
export * from "./is-ajax";
export * from "./is-authenticated";
export * from "./unauthorized";

export async function use(req, res, middlewares = []) {
  req.headers["content-security-policy"] = "connect-src 'self' wss://ws-mt1.pusher.com https://*.sentry.io;default-src 'self' https://avatarbox.io https://*.avatarbox.io;font-src 'self' https://maxcdn.bootstrapcdn.com https://fonts.gstatic.com;img-src 'self' https://avatarbox.io https://*.avatarbox.io https://www.gravatar.com http://en.gravatar.com https://unsplash.it https://i.picsum.photos https://picsum.photos https://www.facebook.com https://www.google-analytics.com data:;script-src 'self' https://avatarbox.io https://*.avatarbox.io 'unsafe-eval' https://www.google-analytics.com https://www.googletagmanager.com https://cdnjs.cloudflare.com https://js.pusher.com https://cdn.jsdelivr.net https://connect.facebook.net https://graph.facebook.com http://graph.facebook.com https://z.moatads.com https://weheartit.com https://assets.pinterest.com https://s7.addthis.com;style-src 'self' https://avatarbox.io https://*.avatarbox.io 'unsafe-inline' https://maxcdn.bootstrapcdn.com fonts.googleapis.com https://unpkg.com https://cdn.jsdelivr.net";
  return Promise.all(
    middlewares.map(function (middleware) {
      return runMiddleware(req, res, middleware);
    })
  );
}

export function runMiddleware(req, res, middleware) {
  return new Promise((resolve, reject) => {
    middleware(req, res, (result) => {
      if (result instanceof ImageShortageError) {
        req.session.prompt = new ImageShortageVM(result);
        if (req.isAjax) {
          return res
            .status(400)
            .json({ code: result.code, message: result.message });
        } else {
          redirect(res, "/");
        }
      } else if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}
