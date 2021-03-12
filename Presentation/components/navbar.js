import React from "react";
import MenuButton from "./menu-button";
const classNames = require("classnames");

function NavBar({ model }) {
  const menuButton = model.user ? <MenuButton user={model.user} /> : null;
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
            <img src="https://www.avatarbox.io/images/avatarbox.png" alt="Logo" />
          </a>
          <span
            data-target="navbar-menu"
            className={classNames("navbar-burger burger script-enabled cloak", {
              "is-hidden": model.isCosmetic,
            })}
          >
          {menuButton}
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
              <MenuButton user={model.user} />
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
            <span className={model.user ? "navbar-item" : "is-hidden"}>
              <a className="has-text-white" href="/home/sign-out">
                Sign Out
              </a>
            </span>
            <div className={model.user ? "avatar-icon" : "is-hidden"}>
              <MenuButton user={model.user} />
            </div>
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
