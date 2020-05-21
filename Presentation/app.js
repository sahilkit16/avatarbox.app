require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

const sanityRoute = require("./routes/sanity");
const calendarRoute = require("./routes/calendar");
const feedbackRoute = require("./routes/feedback");
const homeRoute = require("./routes/home");
const notFoundRoute = require("./routes/notfound");

const morgan = require("morgan");
const errorHandler = require("./middleware/error-handler");
const crashReporterScope = require("./middleware/crash-reporter-scope");

// workaround for dev container
// see https://github.com/zeit/next.js/issues/4022
const dev = !!process.env.DEV_ENV;

app.use(
  cookieSession({
    name: "session",
    keys: [process.env.SESSION_KEY],
    httpOnly: !dev,
  })
);

app.use(morgan("tiny"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set("views", "./Presentation/views");
app.set("view engine", "pug");

if (process.env.SANITY) {
  app.use("/sanity", sanityRoute);
} else {
  app.use("/sanity", notFoundRoute);
}

app.use("/calendar", calendarRoute);

app.use("/feedback", feedbackRoute);

app.use("/home", homeRoute);

app.use(errorHandler);
app.use(crashReporterScope);

let _handler = (req, res) => {
  return res.status(200).end();
};

const setHandler = (handler) => {
  _handler = handler;
};

app.get("/*", (req, res) => {
  return _handler(req, res);
});

module.exports = {
  app,
  setHandler,
};
