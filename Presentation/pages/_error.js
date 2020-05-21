import HeroHead from "../components/hero-head";
import HeroSection from "../components/hero-section";
import ErrorBody from "../components/error-body";
import ErrorView from "../view-models/error";
import { useEffect } from "react";
import * as Sentry from "@sentry/browser";

function Error({ statusCode, eventId }) {
  const model = new ErrorView();
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
    if(typeof window != "undefined"){
      window.eventId = eventId;
    }
  });

  return (
    <HeroSection hideCoverImage="true">
      <HeroHead title={model.title} navbar={model.navbar} />
      <ErrorBody message={model.message} eventId={eventId}/>
    </HeroSection>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  const eventId = Sentry.captureException(err);
  return { statusCode, eventId };
};

export default Error;
