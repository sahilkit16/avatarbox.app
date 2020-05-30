import React from "react";
import Head from "next/head";
import NavBar from "./navbar";
import ReactGA from "react-ga";

function HeroHead({ title, navbar }) {
  ReactGA.initialize(process.env.GA_TRACKING_CODE, { 
    debug: !!process.env.DEV_ENV 
  })
  return (
    <div className="hero-head">
      <Head>
        <title>{title}</title>
        <link rel="stylesheet" type="text/css" href="../css/landing.css" />
      </Head>
      <NavBar model={navbar} />
    </div>
  );
}

export default HeroHead;
