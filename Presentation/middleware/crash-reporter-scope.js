const { createContainer, asValue } = require("awilix");
const CrashReporter = require("../../Common/crash-reporter.server");

// workaround for https://github.com/zeit/next.js/issues/1852

function crashReporterScope(req, res, next) {
  req.scope = createContainer().createScope();
  req.scope.register({
    crashReporter: asValue(new CrashReporter()),
  });
  next();
}

module.exports = crashReporterScope;
