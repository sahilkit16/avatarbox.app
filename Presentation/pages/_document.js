/* eslint-disable react/no-danger */
import Document, { Html, Head, Main, NextScript } from "next/document";
const cacheBuster = "dca58cb6";
class AvatarBoxSite extends Document {
  render() {
    return (
      <Html lang="en" id="here">
        <meta httpEquiv="Content-Security-Policy" content="connect-src 'self' wss://ws-mt1.pusher.com https://*.sentry.io;default-src 'self' https://avatarbox.io https://*.avatarbox.io;font-src 'self' https://maxcdn.bootstrapcdn.com https://fonts.gstatic.com;img-src 'self' https://avatarbox.io https://*.avatarbox.io https://www.gravatar.com http://en.gravatar.com https://unsplash.it https://i.picsum.photos https://picsum.photos https://www.facebook.com https://www.google-analytics.com data:;script-src 'self' https://avatarbox.io https://*.avatarbox.io 'unsafe-eval' https://www.google-analytics.com https://cdnjs.cloudflare.com https://js.pusher.com https://cdn.jsdelivr.net https://connect.facebook.net https://graph.facebook.com http://graph.facebook.com https://z.moatads.com https://weheartit.com https://assets.pinterest.com;style-src 'self' https://avatarbox.io https://*.avatarbox.io 'unsafe-inline' https://maxcdn.bootstrapcdn.com fonts.googleapis.com https://unpkg.com https://cdn.jsdelivr.net"/>
        <meta charSet="utf-8" />
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
        <meta property="og:type" content="website" />
        <Head>
          <link rel="manifest" href={`/manifest.json?ver=${cacheBuster}`} />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="data:image/png;base64,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"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACaklEQVRYR+2VsUtqYRiHf6KRIghBiwqKkn9Ahq6h5BCKQw6GUZBDurk4GARCCgrODuomOQiKSNGgmNKaSGtBgRXRmoaDEvfyfnCHuN1zvnOoe7ngtzic43kf3u/5va8CwA/8w6OYA8w78N92YH9/H3t7eyw/nU4H6XRaVpZkpUChUOD29hYrKyus6Hg8hsFgwNvbm2QIWQAejwetVgvv7+9QKpWs6MHBAUql0t8BqNVqCAQCqNfrsFgssNvt6Pf7cDgc3w+g1+sxHA6xsLCAzc1NWK1W5PN5VnhtbQ2DwUAShOQrODo6QiqVYhBUXKfT4fn5GRqNBoVCAdFo9PsA6L7v7+9hMpmQTCZxfHzMipXLZezu7sqSUVIHfD4fTk9PmXx094+PjwxgfX0dvV5PloySAM7OzuD1enF+fs5+fx2K5c3NDWw2m2QZuQHMZjPu7u5Y7La2ttBoND7cdSKRQCaTkSwjNwCJRwK+vLwwB2az2QcASsfDwwNUKpUkGbkAKHJkPRXJZrM4PDz81PRmswm/3y9JRi4AGjo0fOiMRiNMp9NPASiKWq1WkoxcAO12GxsbG5LyzTsZRQHIbDKcTKeNd3l5KQiyvb2NcDjMLaMoQC6XQzweZ603Go2iG482JG1KAuaZjIIAi4uLeHp6wvLyMorFIiKRCNc1XFxcwOVycckoCLCzs4OTkxNW1Ol04urqigsgFAqhUqlwySgIQBOPNt719TVWV1e5itNLarWaLailpSV0u1243e4//lcQgGIVDAbx+vr62+QTo4nFYsybarWKyWQiD0CsyFc8F03BVxQR+sYcYN6Bny0wDRAKSVTGAAAAAElFTkSuQmCC"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABE0lEQVQ4T82TMYqDQBiFn9qYwsIgYqk3sIwgpBDs9ABWHsFALmCsPYWl2ImVWKWNlY2tCp5ArMRlXFhwJ8tm2SYDUw3z8d7H/zMAVvzjMO8NqKoKgiDgdDphWZanRX+sYJomsizD4XCA53nI8/xvgCRJMI4jjscjZFmG67qvAyRJQt/30HUdoijifr9DVVUMw0BBnla4Xq9wHAfn83n70DQN0jRFGIa/AxiGQdu2iKIIpAY5l8tlu5qmUTKpBJZloSxLzPOMdf2cMZZlwfP8luq7TApAok7ThNvttosbxzE4jqNk7gCKoqDrOhiGgcfjsQPYto2iKCiZOwCxHgQBfN+nZJEaZC6Im7quv97ffBde2fIPQIRqAWL9UroAAAAASUVORK5CYII="
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://www.avatarbox.io/css/bundle.0000.min.css"
          />
        </Head>
        <body id="menu">
          <Main />
          <NextScript />
        </body>
        <script
          async
          type="text/javascript"
          src="https://www.avatarbox.io/js/bundle.min.js"
        ></script>
      </Html>
    );
  }
}

export default AvatarBoxSite;
