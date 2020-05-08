import React from "react";
import HeroHead from "../components/hero-head";
import HeroSection from "../components/hero-section";
import HomeView from "../view-models/home";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.renderValidationMessage = this.renderValidationMessage.bind(this);
  }

  static getInitialProps = async (ctx) => {
    const userid = ctx.query.next && ctx.req.session.userid;
    const action = `/home/${userid ? "sign-in" : "get-started"}`;
    const model = new HomeView();
    model.action = action;
    model.user = ctx.req.session.user;
    model.validationMessage = ctx.req.session.validationMessage;
    ctx.req.session.validationMessage = null;
    return model;
  };

  renderValidationMessage() {
    const { validationMessage } = this.props;
    return (validationMessage
            ? <span className="has-text-danger">{validationMessage}</span>
            : null);
  }

  render() {
    return (
      <HeroSection>
        <HeroHead title="Home | Avatar Box" user={this.props.user} />
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-6 is-offset-3">
              <h1 className="title">New Avatar, Daily</h1>
              <h2 className="subtitle">
                A handy resource to auto update your Gravatar icon
              </h2>
              <div className={`${!this.props.user && "is-hidden"}`}>
                <a className="button is-white" href="/calendar">
                  <i className="fa fa-calendar"></i>
                  &nbsp; Calendar
                </a>
              </div>
              <form
                className={`${this.props.user ? "is-hidden" : "box"}`}
                method="post"
                action={this.props.action}
              >
                <div className="field is-grouped">
                  <p id="email-input" className="control is-expanded step-1">
                    <input
                      className="input email"
                      name="email"
                      type="email"
                      placeholder="&#xf003; Email Address"
                    />
                  </p>
                  <p className="control is-expanded step-2">
                    <input
                      className="input text"
                      name="ciphertext"
                      type="password"
                      placeholder="&#xf084; Encrypted Password"
                    />
                  </p>
                  <p className="control">
                    <button type="submit" className="button is-info">
                      <span className="step-1">Get Started</span>
                      <span className="step-2">Sign In</span>
                    </button>
                  </p>
                </div>
                {this.renderValidationMessage()}
              </form>
            </div>
            <a
              href="/encrypt"
              className="step-2 has-text-white has-text-centered is-size-6"
            >
              Encrypt My Password
            </a>
          </div>
        </div>
      </HeroSection>
    );
  }
}

export default Index;
