import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { container } from "../../Common/di-container";
import { applySession } from "next-session";
import { AvatarsVM } from "../view-models/avatars.vm";
import { use, isAuthenticated } from "../middleware";
import * as actions from "../actions/app.actions";
import Head from "next/head";

export async function getServerSideProps({ req, res }) {
  const cache = container.resolve("cacheService");
  await applySession(req, res, {
    store: cache.redis.store,
  });
  await use(req, res, [isAuthenticated]);
  const { user } = req.session.passport;
  const { calendar } = req.session;
  const model = new AvatarsVM();
  model.User = user;
  model.calendar = calendar;
  return {
    props: model.toObject(),
  };
}

class AvatarsPage extends React.Component {
  constructor(props) {
    super(props);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }
  componentDidUpdate() {
    if (this.props.deleteSelectedIcon) {
      console.log("delete: ", this.props.selectedIcon);
    }
  }
  get images() {
    return this.props.calendar.images.map((image, index) => (
      <div
        key={index}
        className="image-grid-item"
        onClick={this.open.bind(this, image)}
      >
        <img className="icon" src={image.url} />
      </div>
    ));
  }
  open(icon) {
    this.props.selectIcon(icon);
  }
  close() {
    this.props.closeMenu();
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
