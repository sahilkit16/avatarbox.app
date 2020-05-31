/* eslint-disable react/no-danger */
import Document, { Html, Head, Main, NextScript } from "next/document";
const cacheBuster = "dca58cb6";
class AvatarBoxSite extends Document {
  render() {
    return (
      <Html lang="en" id="here">
        <Head>
          <meta charSet="utf-8" />
          <link rel="manifest" href={`/manifest.json?ver=${cacheBuster}`} />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000"></meta>
          <meta name="description" content="A Gravatar auto updater" />
          <meta name="robots" content="all" />
          <meta name="twitter:card" content="summary_large_image"></meta>
          <meta name="twitter:creator" content="@mrtills"></meta>
          <meta property="og:title" content="Avatar Box" />
          <meta property="og:description" content="A Gravatar Auto Updater" />
          <meta property="og:url" content="https://avatarbox.io" />
          <meta
            property="og:image"
            content="https://avatarbox.io/images/architecture.png"
          />
          <meta property="og:type" content="website" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={`/images/apple-touch-icon.png?ver=${cacheBuster}`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={`/images/favicon-32x32.png?ver=${cacheBuster}`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={`/images/favicon-16x16.png?ver=${cacheBuster}`}
          />

          <link
            rel="shortcut icon"
            href={`../images/fav_icon.png?ver=${cacheBuster}`}
            type="image/x-icon"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href={`../css/reset.css?ver=${cacheBuster}`}
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://unpkg.com/bulma@0.8.0/css/bulma.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href={`../css/site.css?ver=${cacheBuster}`}
          />
        </Head>
        <body id="menu">
          <Main />
          <NextScript />
        </body>
        <script
          async
          type="text/javascript"
          src="https://cdnjs.cloudflare.com/ajax/libs/jsencrypt/2.3.1/jsencrypt.min.js"
        ></script>
        <script async type="text/javascript" src="../js/site.js"></script>
        <script async type="text/javascript" src="../js/bulma.js"></script>
        <script
          async
          type="text/javascript"
          src="../js/rsa-encrypt.js"
        ></script>
      </Html>
    );
  }
}

export default AvatarBoxSite;
