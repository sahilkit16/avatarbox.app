import Head from "next/head";
import ErrorBody from "../components/error-body";
import ErrorVM from "../view-models/error.vm";
import { CrashReporter } from "../../Common/crash-reporter.client";

function Error({ statusCode, eventId }) {
  const model = new ErrorVM();
  model.title = "Error | Avatar Box";
  model.eventId = eventId;
  if (statusCode) {
    model.title = `${statusCode} ${model.title}`;
  } else {
    model.message = "An error has occurred.";
  }

  if (typeof window != "undefined") {
    window.eventId = eventId;
  }

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://www.avatarbox.io/css/error.css"
        />
      </Head>
      <ErrorBody message={model.message} eventId={eventId} />
    </>
  );
}

Error.getInitialProps = ({ req, res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  const crashReporter = new CrashReporter();
  const eventId = crashReporter.submit(err);
  req.session.eventId = eventId;
  const model = new ErrorVM();
  model.title = `${statusCode} Error | Avatar Box`;
  model.message = `A ${statusCode} server error has occurred.`;
  model.eventId = eventId;
  model.statusCode = statusCode;
  return model;
};

export default Error;
