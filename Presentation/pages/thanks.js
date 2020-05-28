import React from "react";
import ThanksVM from "../view-models/thanks.vm";

export async function getServerSideProps(context) {
  const { user } = context.req.session;
  const model = new ThanksVM();
  model.appziScript = "https://w.appzi.io/bootstrap/bundle.js?token=h2U0P";
  model.navbar.user = user;
  return {
    props: model.toObject(),
  };
}

class ThanksPage extends React.Component {
  render() {
    return (
      <div className="hero-body">
        <div className="container">
          <section>
            <h1 className="title has-text-centered is-size-1">
              That's all, thank you!
            </h1>
            <div className="level">
              <h1 className="level-item subtitle has-text-centered">
                We really appreciate your time.
              </h1>
            </div>
          </section>
          <hr className="partition" />
          <div className="level">
            <div className="level-item">
              <p className="cta has-text-centered">Tell your friends!</p>
            </div>
          </div>
          <div className="level">
            <div className="level-item">
              <div className="is-size-3" id="social-icons">
                <a className="icon">
                  <i className="fa fa-facebook"></i>
                </a>
                <a className="icon">
                  <i className="fa fa-twitter"></i>
                </a>
                <a className="icon">
                  <i className="fa fa-envelope"></i>
                </a>
                <a className="icon">
                  <i className="fa fa-google"></i>
                </a>
              </div>
            </div>
          </div>
          <hr className="partition" />
          <div className="level">
            <div className="level-item">
              <p className="has-text-centered is-size-7">
                PS: If you found this valuable, pass it on to your friends.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ThanksPage;
