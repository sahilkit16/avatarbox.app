const http = require("http");
const next = require("next");
const { app, setHandler } = require("./app");
const container = require("../Common/di-container");

// workaround for dev container
// see https://github.com/zeit/next.js/issues/4022
const dev = !!process.env.DEV_ENV;

const nx = next({ dev, dir: "Presentation" });
const handle = nx.getRequestHandler();

setHandler((req, res) => {
  return handle(req, res);
});

const crashReporter = container.resolve("crashReporter");
const logger = container.resolve("logger");

nx.prepare()
  .then(() => {
    const port = process.env.PORT || 8080;
    return new Promise((resolve, reject) => {
      http
        .createServer(app)
        .listen(port, function () {
          logger.notice(`magic is happening on port ${port}`);
          resolve(true);
        })
        .on("error", reject);
    });
  })
  .catch((err) => {
    crashReporter.submit(err);
    logger.error(err.message);
    process.exit(1);
  });
