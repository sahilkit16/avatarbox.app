import { Provider } from "react-redux";
import configureStore from "../store/configureStore";
import HeroHead from "../components/hero-head";
import HeroSection from "../components/hero-section";
import CacheSeed from "../components/cache-seed.renderless";
import ImageShortage from "../components/image-shortage";
import MobileSidebar from "../components/mobile-sidebar";

function AvatarBoxApp({ Component, pageProps, router }) {
  if (router.route == "/health") {
    return null;
  }
  if (router.route == "/404") {
    return <Component {...pageProps} />;
  }
  if (router.route == "/_error") {
    <HeroSection hideCoverImage={true}>
      <HeroHead title={pageProps.title} navbar={pageProps.navbar} />
      <Component {...pageProps} />
    </HeroSection>;
  }
  if (pageProps.navbar) {
    pageProps.navbar.pathName = router.route;
  }

  const { user, calendar } = pageProps;

  const imageShortagePrompt =
    pageProps.prompt && pageProps.prompt.name == "image-shortage" ? (
      <ImageShortage {...pageProps.prompt} />
    ) : null;
  return (
    <Provider store={configureStore({ user, calendar })}>
      {imageShortagePrompt}
        <HeroSection hideCoverImage={pageProps.hideCoverImage}>
          <HeroHead title={pageProps.title} navbar={pageProps.navbar} />
          <Component {...pageProps} />
          <CacheSeed />
        </HeroSection>
        <CacheSeed />
        <form id="menu-form" method="post" action="/api/menu">
          <MobileSidebar />
        </form>
    </Provider>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default AvatarBoxApp;
