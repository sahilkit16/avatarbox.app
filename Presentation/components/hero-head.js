import Head from 'next/head';

function HeroHead(props) {
  return (
    <div className="hero-head">
      <Head>
        <title>{props.title}</title>
        <link rel="stylesheet" type="text/css" href="../css/landing.css"/>
      </Head>
      <nav className="navbar is-transparent">
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item is-transparent" href="/">
              <img src="/images/avatarbox.png" alt="Logo" />
            </a>
            <span className="navbar-burger burger is-hidden" data-target="navbarMenu">
              <span></span>
              <span></span>
              <span></span>
            </span>
            <noscript>
              <a href="#navbarMenu" className="navbar-burger burger is-progressive">
                <span></span>
                <span></span>
                <span></span>
              </a>
            </noscript>
          </div>
          <div id="navbarMenu" className="navbar-menu is-transparent has-text-centered">
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
              <span className={props.user ? "navbar-item" : "is-hidden"}>
                <a className="has-text-white" href="/home/sign-out">
                    Sign Out
                </a>
              </span>
              <noscript>
                <a href="#" className="button is-transparent">
                  <span className="navbar-burger burger is-active is-progressive">
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
    </div>
  );
}

export default HeroHead;
