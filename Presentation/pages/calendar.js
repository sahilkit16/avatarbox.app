import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Head from "next/head";
import CalendarVM from "../view-models/calendar.vm";
import * as actions from "../actions/app.actions";

export async function getServerSideProps(context) {
  const { user, calendar } = context.req.session;
  const model = new CalendarVM();
  model.images = calendar.images;
  model.isEnabled = calendar.isEnabled;
  model.navbar.user = user;
  return {
    props: model.asPOJO(),
  };
}

class CalendarPage extends React.Component {
  render() {
    return (
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered is-marginless">
            <div className="column is-paddingless is-two-thirds-tablet is-half-desktop">
              <div className="card">
                <Head>
                  <link rel="stylesheet" type="text/css" href="../css/calendar.css" />
                </Head>
                <header className="card-header">
                  <p className="card-header-title"><span id="calendar-heading">Calendar</span><span id="confirm">Are You Sure?</span></p>
                </header>
                <div className="card-content card-block is-paddingless">
                  <div className="slide-btn prev script-enabled cloak"><div className="fa fa-chevron-left is-size-4"></div></div>
                  <div className="slides is-block-centered">
                    <figure id="avatar-0">
                      <img className="is-block-centered" src="http://en.gravatar.com/userimage/102303045/f631f987bc31023f1cf5de3e3228a7cb.jpg?size=200" />
                      <p className="has-text-grey is-size-7">Now</p>
                    </figure>
                    <figure id="avatar-1">
                      <img className="is-block-centered" src="http://en.gravatar.com/userimage/102303045/3796dd4fcb8ce1695abe26c8091adc4e.jpg?size=200" />
                      <p className="has-text-grey is-size-7">Tomorrow</p>
                    </figure>
                  </div>
                  <div className="slide-btn next script-enabled cloak"><div className="fa fa-chevron-right is-size-4"></div></div>
                  <div className="is-block-centered" id="disclaimer">
                    <h2 className="is-hidden has-text-centered">Your Gravatar icon will be updated once a day.</h2>
                    <h2 className="has-text-centered">Your Gravatar icon will no longer be updated.</h2>
                  </div>
                </div>
                <form className="card-footer" action="/calendar/submit" method="post">
                  <a className="card-footer-item" id="home" href="/"><i className="fa fa-home" aria-hidden="true"></i>&nbsp; Home</a>
                  <a className="card-footer-item" id="back" href="#"><i className="fa fa-chevron-left" aria-hidden="true"></i>&nbsp; Back</a>
                  <a className="is-hidden card-footer-item btn-next" href="#here">Start &nbsp;<i className="fa fa-chevron-right" aria-hidden="true"></i></a>
                  <a className="card-footer-item btn-next" href="#here">Disable &nbsp;<i className="fa fa-close" aria-hidden="true"></i></a>
                  <button className="is-hidden card-footer-item btn-submit" id="enable" type="submit">Let it rip &nbsp; <i className="fa fa-send" aria-hidden="true"></i></button>
                  <button className="button card-footer-item btn-submit" id="disable" type="submit">Okay &nbsp; <i className="fa fa-check" aria-hidden="true"></i></button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

export default connect(null, mapDispatchToProps)(CalendarPage);
