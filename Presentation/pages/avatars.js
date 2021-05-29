import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { container } from "../../Common/di-container";
import { applySession } from "next-session";
import { CalendarVM } from "../view-models/calendar.vm";
import * as actions from "../actions/app.actions";
import Head from "next/head";

export async function getServerSideProps({ req, res, query }) {
  const cache = container.resolve("cacheService");
  await applySession(req, res, {
    store: cache.redis.store,
  });
  const { user } = req.session.passport;
  const { calendar } = req.session;
  const model = new CalendarVM();
  model.User = user;
  model.calendar = calendar;
  return {
    props: model.toObject(),
  };
}

class AvatarsPage extends React.Component {
  constructor(props) {
    super(props);
  }
  get images() {
    return this.props.calendar.images.map((image, index) => (
      <div key={index} className="image-grid-item">
        <img className="icon" src={image.url} />
      </div>
    ));
  }
  render() {
    return (
      <div className="container">
        <Head>
          <link rel="stylesheet" type="text/css" href="/avatars.css" />
        </Head>
        <div id="image-grid">
          {this.images}
          <div className="image-grid-item is-invisible"></div>
          <div className="image-grid-item is-invisible"></div>
          <div className="image-grid-item is-invisible"></div>
          <div className="image-grid-item is-invisible"></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AvatarsPage);
