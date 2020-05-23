import React from "react";

export default function MenuButton({ user }) {
  const avatar = (
    <figure className="avatar-icon image is-32x32">
      <img
        className="is-rounded"
        width="32"
        height="32"
        src={`https://www.gravatar.com/avatar/${user && user.hash}`}
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
