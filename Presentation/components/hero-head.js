import React from "react";
import Head from "next/head";
import NavBar from "./navbar";

function HeroHead({ title, navbar }) {
  return (
    <div className="hero-head">
      <NavBar model={navbar} />
    </div>
  );
}

export default HeroHead;
