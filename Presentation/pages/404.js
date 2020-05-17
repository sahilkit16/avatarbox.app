import HeroHead from "../components/hero-head";
import HeroSection from "../components/hero-section";
import Oops from "../components/oops";
import ErrorView from "../view-models/error";

export default function Custom404() {
  const model = new ErrorView();
  model.title = "Page Not Found | Avatar Box";
  model.subtitle = "404 Page Not Found";
  model.message = "The page you are looking for could not be found.";
  return (
    <HeroSection hideCoverImage="true">
        <HeroHead title={model.title} navbar={model.navbar} />
        <Oops 
          title={model.subtitle} 
          message={model.message} />
    </HeroSection>
  );
}
