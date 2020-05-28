import { Provider } from "react-redux";
import configureStore from "../store/configureStore";
import HeroHead from "../components/hero-head";
import HeroSection from "../components/hero-section";
import CacheSeed from "../components/cache-seed.renderless";
import ImageShortage from "../components/image-shortage";

function AvatarBoxApp({ Component, pageProps, router }) {
  if(router.route == "/404"){
    return <Component />;
  }
  const { user, calendar } = pageProps;

  const imageShortagePrompt = (pageProps.prompt && pageProps.prompt.name == "image-shortage" 
                            ? <ImageShortage {...pageProps.prompt}/> 
                            : null);
  const appziScript = (pageProps.appziScript
                    ? <script async="async" type="text/javascript" src={pageProps.appziScript}></script>
                    : null);
  return (
    <Provider store={configureStore({ user, calendar })}>
      {imageShortagePrompt}
      {appziScript}
      <HeroSection hideCoverImage={pageProps.hideCoverImage}>
        <HeroHead title={pageProps.title} navbar={pageProps.navbar} />
        <Component {...pageProps} />
        <CacheSeed />
      </HeroSection>
      <CacheSeed />
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
