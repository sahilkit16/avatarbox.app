import React, { useEffect } from "react";
import Head from "next/head";
import NavBar from "./navbar";
import ReactGA from "react-ga";
import ReactPixel from "react-facebook-pixel";

function HeroHead({ title, navbar }) {
  ReactGA.initialize(process.env.GA_TRACKING_CODE, {
    debug: !!process.env.DEV_ENV,
  });
  useEffect(() => {
    ReactPixel.init(process.env.PIXEL_ID);
    ReactPixel.pageView();
  });
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
