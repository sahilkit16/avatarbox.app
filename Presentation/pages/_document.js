/* eslint-disable react/no-danger */
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { useAmp } from 'next/amp';

function AmpWrap({ ampOnly, nonAmp }) {
  const isAmp = useAmp();
  if (ampOnly) return isAmp && ampOnly;
  return !isAmp && nonAmp;
}

class AvatarBoxSite extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/images/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/images/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/images/favicon-16x16.png"
          />
          <meta charSet="utf-8" />
          <link rel="manifest" href="/manifest.json" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000"></meta>
          <link rel="shortcut icon" href="../images/fav_icon.png" type="image/x-icon"/>
          <link rel="stylesheet" type="text/css" href="../css/reset.css" />
          <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
          <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700" rel="stylesheet"/>
          <link rel="stylesheet" type="text/css" href="https://unpkg.com/bulma@0.8.0/css/bulma.min.css" />
          <link rel="stylesheet" type="text/css" href="../css/landing.css"/>
          <link rel="stylesheet" type="text/css" href="../css/site.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script async type="text/javascript" src="../js/bulma.js"></script>
        </body>
      </Html>
    );
  }
}

export default AvatarBoxSite;