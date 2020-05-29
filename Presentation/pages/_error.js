import Head from "next/head";
import HeroHead from "../components/hero-head";
import HeroSection from "../components/hero-section";
import ErrorBody from "../components/error-body";
import ErrorVM from "../view-models/error.vm";
import { useEffect } from "react";
import CrashReporter from "../../Common/crash-reporter.client";

function Error({ statusCode, eventId }) {
  const model = new ErrorVM();
  model.title = "Error | Avatar Box";
  model.eventId = eventId;

  if (statusCode) {
    model.title = `${statusCode} ${model.title}`;
    model.message = `A ${statusCode} server error has occurred.`;
  } else {
    model.message = "A client error has occurred.";
  }

  useEffect(() => {
    site.uncloak();
    if (typeof window != "undefined") {
      window.eventId = eventId;
    }
  });

  return (
    <HeroSection hideCoverImage="true">
      <Head>
        <link rel="stylesheet" type="text/css" href="../css/error.css" />
      </Head>
      <HeroHead title={model.title} navbar={model.navbar} />
      <ErrorBody message={model.message} eventId={eventId} />
    </HeroSection>
  );
}

Error.getInitialProps = ({ req, res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  const crashReporter = new CrashReporter();
  const eventId = crashReporter.submit(err);
  req.session.eventId = eventId;
  return { statusCode, eventId };
};

export default Error;
