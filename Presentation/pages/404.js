import HeroHead from "../components/hero-head";
import HeroSection from "../components/hero-section";
import NavBarView from "../view-models/_navbar";

export default function Custom404() {
  const navbar = new NavBarView();
  navbar.isCosmetic = true;
  navbar.isTransparent = false;
  return (
    <HeroSection hideCoverImage="true">
        <HeroHead title="Page Not Found | Avatar Box" navbar={navbar} />
        <div className="hero-body">
          <div className="container">
            <section>
              <h1 className="title has-text-centered is-size-1">
                404 Page Not Found
              </h1>
              <div className="level">
                <h1 className="level-item subtitle has-text-centered">
                  The page you are looking for could not be found.
                </h1>
              </div>
            </section>
          </div>
        </div>
    </HeroSection>
  );
}
