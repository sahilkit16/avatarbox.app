import React from 'react';
const classNames = require("classnames");

function NavBar({ model }) {
  return (
    <nav
      className={classNames("navbar", {
        "is-centered": model.isCosmetic,
        "is-transparent": model.isTransparent,
        "has-background-grey-darker": !model.isTransparent,
      })}
    >
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item is-transparent" href="/">
            <img src="/images/avatarbox.png" alt="Logo" />
          </a>
          <span
            data-target="navbar-menu"
            className={classNames(
              "navbar-burger",
              "burger",
              "script-enabled",
              "cloak",
              {
                "is-hidden": model.isCosmetic,
              }
            )}
          >
            <span></span>
            <span></span>
            <span></span>
          </span>
          <noscript>
            <a
              href="#menu"
              data-target="navbar-menu"
              className={classNames("navbar-burger", "burger", "noscript", {
                "is-hidden": model.isCosmetic,
                "has-background-grey-darker": !model.isTransparent,
              })}
            >
              <span></span>
              <span></span>
              <span></span>
            </a>
          </noscript>
        </div>
        <div
          id="navbar-menu"
          className={classNames(
            "navbar-menu",
            "has-text-centered",
            "is-transparent",
            {
              "is-hidden": model.isCosmetic,
              "has-background-grey-darker": !model.isTransparent,
            }
          )}
        >
          <div className="navbar-end">
            <span className="navbar-item">
              <a
                className="button is-white is-outlined"
                href="https://bitbucket.org/mrtillman/avatarbox.web/wiki/Home"
              >
                <span className="icon">
                  <i className="fa fa-book"></i>
                </span>
                <span>Documentation</span>
              </a>
            </span>
            <span className="navbar-item">
              <a
                className="button is-white is-outlined"
                href="https://bitbucket.org/mrtillman/avatarbox.web"
              >
                <span className="icon">
                  <i className="fa fa-bitbucket"></i>
                </span>
                <span>View Source</span>
              </a>
            </span>
            <span className={model.user ? "navbar-item" : "is-hidden"}>
              <a className="has-text-white" href="/home/sign-out">
                Sign Out
              </a>
            </span>
            <noscript>
              <a href="#" className="button is-transparent">
                <span className="navbar-burger burger is-active noscript">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </a>
            </noscript>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
