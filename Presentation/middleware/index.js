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

function runMiddleware(req, res, middleware) {
  return new Promise((resolve, reject) => {
    middleware(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}
