import Head from "next/head";
import classNames from 'classnames';

export default function Oops({ title, message, eventId }) {
  return (
    <div className="hero-body">
      <Head>
        <link rel="stylesheet" type="text/css" href="../css/error.css" />
        <script
          type="text/javascript"
          src="https://browser.sentry-cdn.com/5.15.5/bundle.min.js"
          integrity="sha384-wF7Jc4ZlWVxe/L8Ji3hOIBeTgo/HwFuaeEfjGmS3EXAG7Y+7Kjjr91gJpJtr+PAT"
          crossorigin="anonymous"
        ></script>
        <script type="text/javascript" src="../js/error.js"></script>
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
          <div className={classNames("level script-enabled cloak", {
            "is-hidden": !eventId
          })}>
            <div className="level-item">
              <button id="btn-feedback" className="button is-info">
                Report Feedback
              </button>
            </div>
          </div>
        </section>
        <noscript>
          <div className="level">
            <div className="level-item">
              <div className="box" id="feedback-form">
                <div>
                  <p className="is-size-4 has-text-gray has-text-centered">
                    It looks like we're having some internal issues.
                  </p>
                  <p className="is-size-6 has-text-grey-light has-text-centered">
                    Our team has been notified. If you'd like to help, tell us
                    what happened below.
                  </p>
                </div>
                <form className="form" action="/feedback" method="POST">
                  <div className="field">
                    <label className="label">
                      Name
                      <div className="control">
                        <input
                          className="input is-medium"
                          name="name"
                          type="text"
                          placeholder="Mary Mack"
                        />
                      </div>
                    </label>
                  </div>
                  <div className="field">
                    <label className="label">
                      Email
                      <div className="control">
                        <input
                          className="input is-medium"
                          name="email"
                          type="email"
                          placeholder="mary@example.com"
                        />
                      </div>
                    </label>
                  </div>
                  <div className="field">
                    <label className="label">
                      What Happened?
                      <textarea
                        className="textarea is-medium"
                        name="comments"
                        placeholder="I clicked on 'X' and then hit 'Confirm'"
                      ></textarea>
                    </label>
                  </div>
                  <button
                    className="button is-info is-pulled-right"
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className={classNames("level", {
            "is-hidden": !eventId
          })}>
            <div className="level-item">
              <a className="button is-info" href="#here" id="btn-feedback">
                Report Feedback
              </a>
            </div>
          </div>
        </noscript>
      </div>
    </div>
  );
}
