import React from "react";
import { useSelector } from "react-redux";

function MenuButton({ user }) {
  const state = useSelector((state) => state);

  const avatar = (
    <figure
      className="avatar-icon image is-32x32"
      title={user && user.email}
      alt={user && user.email}
    >
      <img
        className="is-rounded"
        width="32"
        height="32"
        src={`https://www.gravatar.com/avatar/${user && user.hash}?ver=${
          state.user && state.user.cacheBuster
        }`}
      />
    </figure>
  );

  const burger = (
    <>
      <span></span>
      <span></span>
      <span></span>
    </>
  );

  return user && user.hash ? avatar : burger;
}

export default MenuButton;
