import HeroHead from "../components/hero-head";
import HeroSection from "../components/hero-section";
import Oops from "../components/oops";
import ErrorView from "../view-models/error";
import { useEffect } from "react";

function Error({ statusCode }) {
  const model = new ErrorView();
  model.title = "Error | Avatar Box";
  if (statusCode) {
    model.title = `${statusCode} ${model.title}`;
    model.message = `A ${statusCode} server error has occurred.`;
  } else {
    model.message = "A client error has occurred.";
  }

  useEffect(() => {
    site.uncloak();
  })

  return (
    <HeroSection hideCoverImage="true">
      <HeroHead title={model.title} navbar={model.navbar} />
      <Oops message={model.message} />
    </HeroSection>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
