const http = require("http");
const next = require("next");
const { app, setHandler } = require("./app");
const DataStore = require("../Infrastructure/data-store");
const Logger = require("../Common/logger");
const CrashReporter = require("../Common/crash-reporter");

// workaround for dev container
// see https://github.com/zeit/next.js/issues/4022
const dev = !!process.env.DEV_ENV;

const nx = next({ dev, dir: "Presentation" });
const handle = nx.getRequestHandler();

setHandler((req, res) => {
  return handle(req, res);
});

nx.prepare().then(() => {
  const dataStore = new DataStore();
  const logger = new Logger();
  dataStore.connect().then(() => {
    const crashReporter = new CrashReporter();
    const port = process.env.PORT || 8801;
    http
      .createServer(app)
      .listen(port, function () {
        logger.info(`magic is happening on port ${port}`);
      })
      .on("error", (err) => {
        crashReporter.submit(err);
        logger.error("could not start the http server");
        dataStore.disconnect();
      });
  });
});
