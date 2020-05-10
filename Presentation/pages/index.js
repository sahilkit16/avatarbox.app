import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import HeroHead from "../components/hero-head";
import HeroSection from "../components/hero-section";
import HomeView from "../view-models/home";
import * as actions from "../actions/app.actions";
import classNames from "classnames";
import { signIn } from "../../Infrastructure/fetch.client";

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { step: 1 };
    this.goToNextStep = this.goToNextStep.bind(this);
    this.updateEmailAddress = this.updateEmailAddress.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  static getInitialProps = async (ctx) => {
    const userid = ctx.query.next && ctx.req.session.userid;
    const model = new HomeView();
    model.formAction = `/home/${userid ? "sign-in" : "get-started"}`;
    model.user = ctx.req.session.user;
    model.validationMessage = ctx.req.session.validationMessage;
    ctx.req.session.validationMessage = null;
    return model;
  };

  goToNextStep() {
    const { step } = this.state;
    this.setState({ validationMessage: null });
    if (step == 1) {
      this.setState({
        email: this.state.email,
        step: 2,
      });
    } else if (step == 2) {
      const { email, password } = this.state;
      signIn({ email, password }).then(() => { 
        window.location = "/calendar"; 
      }).catch(validationMessage => {
        this.setState({ step: 1, validationMessage });
      });
    }
  }

  updateEmailAddress(event) {
    this.setState({ email: event.target.value });
  }

  updatePassword(event) {
    this.setState({ password: event.target.value });
  }

  render() {
    const validationMessage = this.state.validationMessage || this.props.validationMessage;
    const validationSummary = validationMessage ? (
      <span className="has-text-danger">{validationMessage}</span>
    ) : null;
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
                id="signin-form"
                className={`${this.props.user ? "is-hidden" : "box"}`}
                method="post"
                action={this.props.formAction}
              >
                <div className="field is-grouped">
                  <p className={"control is-expanded"}>
                    <input
                      className={classNames("input", "email", "step-1", {
                        "is-hidden": this.state.step == 2,
                      })}
                      name="email"
                      type="email"
                      placeholder="&#xf003; Email Address"
                      onChange={this.updateEmailAddress}
                    />
                    <input
                      className={classNames("input", "text", {
                        "is-hidden": this.state.step == 1,
                      })}
                      type="password"
                      placeholder="&#xf084; Password"
                      onChange={this.updatePassword}
                    />
                    <noscript>
                      <input
                        className="input text step-2"
                        name="password"
                        type="password"
                        placeholder="&#xf084; Password"
                      />
                    </noscript>
                  </p>
                  <p className="control">
                    <button
                      type="button"
                      className="button is-info script-enabled cloak"
                      onClick={this.goToNextStep}
                    >
                      {this.state.step == 1 ? "Get Started" : "Sign In"}
                    </button>
                    <noscript>
                      <button type="submit" className="button is-info">
                        <span className="step-1">Get Started</span>
                        <span className="step-2">Sign In</span>
                      </button>
                    </noscript>
                  </p>
                </div>
                {validationSummary}
              </form>
            </div>
          </div>
        </div>
      </HeroSection>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

export default connect(null, mapDispatchToProps)(IndexPage);
