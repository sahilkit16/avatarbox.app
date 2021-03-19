import React, { useEffect } from "react";
import Head from "next/head";
import NavBar from "./navbar";

function HeroHead({ title, navbar }) {
  return (
    <div className="hero-head">
      <Head>
        <title>{title}</title>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://www.avatarbox.io/css/landing.css"
        />
      </Head>
      <NavBar model={navbar} />
    </div>
  );
}

export default HeroHead;
