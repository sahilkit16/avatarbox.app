import Head from "next/head";

export default function Oops({ title, message, eventId }) {
  return (
    <div className="hero-body">
      <Head>
        <link rel='stylesheet' type='text/css' href='../css/error.css'/>
        <script type="text/javascript" src="https://browser.sentry-cdn.com/5.15.5/bundle.min.js" integrity="sha384-wF7Jc4ZlWVxe/L8Ji3hOIBeTgo/HwFuaeEfjGmS3EXAG7Y+7Kjjr91gJpJtr+PAT" crossorigin="anonymous"></script>
        <script type='text/javascript' src='../js/error.js'></script>
      </Head>
      <div className="container">
        <section id="error-message">
          <h1 className="title has-text-centered is-size-1">
            {title || "Oops!"}
          </h1>
          <div className="level">
            <h1 className="level-item subtitle has-text-centered">
              {message || "An error has occurred"}
            </h1>
          </div>
          <div className="level script-enabled cloak">
            <div className="level-item">
              <button id="btn-feedback" class="button is-info">
                Report Feedback
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
