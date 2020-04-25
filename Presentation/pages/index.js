import React from 'react';
import Head from 'next/head';

class Index extends React.Component {
  render() {
    return (
      <section className="hero is-info is-fullheight">
        <Head>
          <title>Sign Up | AvatarBox</title>
        </Head>
        <div className="hero-head">
          <nav className="navbar is-transparent">
            <div className="container">
              <div className="navbar-brand">
                <a className="navbar-item is-transparent" href="#">
                  <img src="/images/avatarbox.png" alt="Logo" />
                </a>
                <span className="navbar-burger burger" data-target="navbarMenu">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </div>
              <div id="navbarMenu" className="navbar-menu is-transparent">
                <div className="navbar-end">
                  <span className="navbar-item">
                    <a className="button is-white is-outlined"
                      href="https://bitbucket.org/mrtillman/avatarbox.web/wiki/Home">
                      <span className="icon">
                        <i className="fa fa-book"></i>
                      </span>
                      <span>Documentation</span>
                    </a>
                  </span>
                  <span className="navbar-item">
                    <a className="button is-white is-outlined"
                      href="https://bitbucket.org/mrtillman/avatarbox.web">
                      <span className="icon">
                        <i className="fa fa-bitbucket"></i>
                      </span>
                      <span>View Source</span>
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-6 is-offset-3">
              <h1 className="title">
                New Avatar, Daily
                    </h1>
              <h2 className="subtitle">
                A handy gadget to update your Gravatar icon
                    </h2>
              <div className="box">
                <div className="field is-grouped">
                  <p className="control is-expanded">
                    <input className="input" type="text" placeholder="Enter your Gravatar email" />
                  </p>
                  <p className="control">
                    <a className="button is-info">
                      Get Started
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Index;
