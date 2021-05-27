import React from "react";
import { useSelector } from "react-redux";

function MenuButton({ user }) {
  const state = useSelector((state) => state);
  const model = {
    imageUrl:
      user && user.hash
        ? `https://www.gravatar.com/avatar/${user && user.hash}`
        : `https://icons.avatarbox.io/u/${user && user.id}`,
    title: user && (user.email || user.username),
  };
  const avatar = (
    <figure
      className="avatar-icon image is-32x32"
      title={model.title}
      alt={model.title}
    >
      <img
        className="is-rounded"
        width="32"
        height="32"
        src={`${model.imageUrl}?ver=${state.user && state.user.cacheBuster}`}
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

  return user ? avatar : burger;
}

export default MenuButton;
