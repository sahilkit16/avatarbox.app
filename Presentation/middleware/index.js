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
