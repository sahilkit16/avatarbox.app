import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import HeroHead from "../components/hero-head";
import HeroSection from "../components/hero-section";
import HomeVM from "../view-models/home.vm";
import * as actions from "../actions/app.actions";
import classNames from "classnames";
import { signIn } from "../../Infrastructure/fetch.client";
import LoginVM from "../view-models/login.vm";
import CacheSeed from "../components/cache-seed.renderless";

export async function getServerSideProps(context) {
  const userid = context.query.next && context.req.session.userid;
  const user = context.req.session.user;
  const model = new HomeVM();
  model.formAction = `/home/${userid ? "sign-in" : "get-started"}`;
  model.User = user;
  model.validationMessage = context.req.session.validationMessage;
  context.req.session.validationMessage = null;
  return {
    props: model.asPOJO(),
  };
}

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { step: 1, isLoading: false, cloak: true };
    this.goToNextStep = this.goToNextStep.bind(this);
    this.updateEmailAddress = this.updateEmailAddress.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.showValidationMessage = this.showValidationMessage.bind(this);
    this.clearValidationMessage = this.clearValidationMessage.bind(this);
    this.clearInputFields = this.clearInputFields.bind(this);
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
  }

  componentDidMount() {
    this.emailRef.current.focus();
    if (this.props.validationMessage) {
      this.setState({ email: null, password: null });
      this.clearInputFields();
    }
    this.setState({ cloak: false });
  }

  componentDidUpdate() {
    if (this.state.step == 1) {
      this.emailRef.current.focus();
    } else if (this.state.step == 2) {
      this.passwordRef.current.focus();
    }
  }

  showValidationMessage(validationMessage, step = 1) {
    this.setState({ validationMessage, step });
    this.clearInputFields();
    if (step == 1) {
      this.emailRef.current.focus();
    } else if (step == 2) {
      this.passwordRef.current.focus();
      this.setState({ password: null });
    }
  }

  clearValidationMessage() {
    if (this.state.validationMessage) {
      this.setState({
        validationMessage: null,
        password: null,
      });
      if (this.state.step == 1) {
        this.setState({ email: null });
      }
    }
  }

  clearInputFields() {
    if (this.emailRef.current && this.passwordRef.current) {
      this.emailRef.current.value = "";
      this.passwordRef.current.value = "";
    }
  }

  goToNextStep() {
    if (this.state.isLoading) return;
    const { step } = this.state;
    this.setState({ validationMessage: null });
    const loginVm = new LoginVM();
    if (step == 1) {
      loginVm.email = this.state.email;
      if (loginVm.errors.email) {
        return this.showValidationMessage(loginVm.errors.email);
      }
      this.setState({
        email: loginVm.email,
        step: 2,
      });
    } else if (step == 2) {
      loginVm.password = this.state.password;
      if (loginVm.errors.password) {
        return this.showValidationMessage(loginVm.errors.password, 2);
      }
      this.setState({ isLoading: true });
      const encrypt = typeof rsaEncrypt != "undefined" && rsaEncrypt;
      const { email, password } = this.state;
      signIn({ email, password: encrypt(password) })
        .then(() => {
          setTimeout(() => (window.location = "/calendar"), 500);
        })
        .catch((validationMessage) => {
          this.setState({
            step: 1,
            isLoading: false,
            validationMessage,
          });
        });
    }
  }

  onKeyPress(event) {
    this.clearValidationMessage();
    if (event.key == "Enter" || event.charCode == 13 || event.which == 13) {
      this.goToNextStep();
    }
  }

  updateEmailAddress(event) {
    this.clearValidationMessage();
    this.setState({ email: event.target.value });
  }

  updatePassword(event) {
    this.clearValidationMessage();
    this.setState({ password: event.target.value });
  }

  render() {
    const validationMessage =
      this.state.validationMessage || this.props.validationMessage;
    let validationSummary = null;
    if (validationMessage) {
      this.clearInputFields();
      validationSummary = (
        <span className="has-text-danger">{validationMessage}</span>
      );
    }
    return (
      <HeroSection>
        <HeroHead title="Home | Avatar Box" navbar={this.props.navbar} />
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
                      maxLength={100}
                      name="email"
                      type="email"
                      placeholder="&#xf003; Email Address"
                      onChange={this.updateEmailAddress}
                      onKeyPress={this.onKeyPress}
                      ref={this.emailRef}
                    />
                    <input
                      className={classNames("input", "text", {
                        "is-hidden": this.state.step == 1,
                      })}
                      maxLength={100}
                      type="password"
                      placeholder="&#xf084; Password"
                      onChange={this.updatePassword}
                      onKeyPress={this.onKeyPress}
                      ref={this.passwordRef}
                    />
                    <noscript>
                      <input
                        maxLength={100}
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
                      className={classNames("button is-info script-enabled", {
                        "is-loading": this.state.isLoading,
                        cloak: this.state.cloak,
                      })}
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
        <CacheSeed />
      </HeroSection>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

export default connect(null, mapDispatchToProps)(IndexPage);
