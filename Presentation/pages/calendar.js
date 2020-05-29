import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Head from "next/head";
import ClassNames from "classnames";
import CalendarVM from "../view-models/calendar.vm";
import * as actions from "../actions/app.actions";
import SlideShowVM from "../view-models/slideshow.vm";
import CrashReporter from "../../Common/crash-reporter.client";
const ImageShortageError = require("../../Domain/image-shortage.error");

const crashReporter = new CrashReporter();

export async function getServerSideProps(context) {
  const { user, calendar } = context.req.session;
  const model = new CalendarVM();
  model.User = user;
  model.calendar = calendar;
  return {
    props: model.toObject(),
  };
}

class CalendarPage extends React.Component {
  constructor(props) {
    super(props);
    this.slideShow = new SlideShowVM();
    this.renderImages = this.renderImages.bind(this);
    this.toggleCalendar = this.toggleCalendar.bind(this);
    this.state = { isLoading: false };
  }

  componentDidMount() {
    this.slideShow.load();
  }

  toggleCalendar(e){
    e.preventDefault();
    this.setState({ isLoading: true });
    this.props.updateCalendar().then(() => {
      this.setState({ isLoading: false });
      window.location.hash = "#";
      if(this.props.user.isNew){
        window.location = "/thanks";
      }
    }).catch(err => {
      if(err instanceof ImageShortageError){
        this.setState({ isLoading: false });
        window.location = "/";
      } else {
        crashReporter.submit(err);
      }
    });
  }

  renderImages() {
    return this.props.calendar.images.map((image, index) => (
      <figure id={`avatar-${index}`} key={`avatar-${index}`}>
        <img
          width="200"
          height="200"
          className="calendar-img is-block-centered"
          src={image.url}
        />
        <p className="has-text-grey is-size-7">{image.day}</p>
      </figure>
    ));
  }

  render() {
    return (
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered is-marginless">
            <div className="column is-paddingless is-two-thirds-tablet is-half-desktop">
              <div className="card">
                <Head>
                  <link
                    rel="stylesheet"
                    type="text/css"
                    href="../css/calendar.css"
                  />
                </Head>
                <header className="card-header">
                  <p className="card-header-title">
                    <span id="calendar-heading">Calendar</span>
                    <span id="confirm">Are You Sure?</span>
                  </p>
                </header>
                <div className="card-content card-block is-paddingless">
                  <div className="slide-btn prev script-enabled cloak">
                    <div className="fa fa-chevron-left is-size-4"></div>
                  </div>
                  <div className="slides is-block-centered">
                    {this.renderImages()}
                  </div>
                  <div className="slide-btn next script-enabled cloak">
                    <div className="fa fa-chevron-right is-size-4"></div>
                  </div>
                  <div className="is-block-centered" id="disclaimer">
                    <h2
                      className={ClassNames("has-text-centered", {
                        "is-hidden": this.props.calendar.isEnabled,
                      })}
                    >
                      Your Gravatar icon will be updated once a day.
                    </h2>
                    <h2
                      className={ClassNames("has-text-centered", {
                        "is-hidden": !this.props.calendar.isEnabled,
                      })}
                    >
                      Your Gravatar icon will no longer be updated.
                    </h2>
                  </div>
                </div>
                <form
                  className="card-footer"
                  action="/calendar/submit"
                  method="post"
                >
                  <a className="card-footer-item" id="home" href="/">
                    <i className="fa fa-home" aria-hidden="true"></i>&nbsp; Home
                  </a>
                  <a className="card-footer-item" id="back" href="#">
                    <i className="fa fa-chevron-left" aria-hidden="true"></i>
                    &nbsp; Back
                  </a>
                  <a
                    className={ClassNames("card-footer-item btn-next", {
                      "is-hidden": this.props.calendar.isEnabled,
                    })}
                    href="#here"
                  >
                    Start &nbsp;
                    <i className="fa fa-chevron-right" aria-hidden="true"></i>
                  </a>
                  <a
                    className={ClassNames("card-footer-item btn-next", {
                      "is-hidden": !this.props.calendar.isEnabled,
                    })}
                    href="#here"
                  >
                    Disable &nbsp;
                    <i className="fa fa-close" aria-hidden="true"></i>
                  </a>
                  <button
                    className={ClassNames("card-footer-item btn-submit", {
                      "is-hidden": this.props.calendar.isEnabled,
                      "button is-loading": this.state.isLoading
                    })}
                    id="enable"
                    onClick={this.toggleCalendar}
                    type="submit"
                  >
                    Let it rip &nbsp;
                    <i className="fa fa-send" aria-hidden="true"></i>
                  </button>
                  <button
                    className={ClassNames("card-footer-item btn-submit", {
                      "is-hidden": !this.props.calendar.isEnabled,
                      "button is-loading": this.state.isLoading
                    })}
                    id="disable"
                    onClick={this.toggleCalendar}
                    type="submit"
                  >
                    Okay &nbsp;
                    <i className="fa fa-check" aria-hidden="true"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarPage);
