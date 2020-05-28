import HeroHead from "../components/hero-head";
import HeroSection from "../components/hero-section";
import ErrorBody from "../components/error-body";
import ErrorVM from "../view-models/error.vm";
import Head from "next/head";

export default function Custom404() {
  const model = new ErrorVM();
  model.title = "Page Not Found | Avatar Box";
  model.subtitle = "404 Page Not Found";
  model.message = "The page you are looking for could not be found.";
  return (
    <HeroSection hideCoverImage="true">
      <Head>
        <link rel="stylesheet" type="text/css" href="../css/error.css" />
      </Head>
      <HeroHead title={model.title} navbar={model.navbar} />
      <ErrorBody title={model.subtitle} message={model.message} />
    </HeroSection>
  );
}
