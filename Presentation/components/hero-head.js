import Head from 'next/head';
import NavBar from './navbar';

// TODO: use context to avoid user prop drilling
// https://reactjs.org/docs/context.html

function HeroHead(props) {
  return (
    <div className="hero-head">
      <Head>
        <title>{props.title}</title>
        <link rel="stylesheet" type="text/css" href="../css/landing.css"/>
      </Head>
      <NavBar isTransparent={true} user={props.user} />
    </div>
  );
}

export default HeroHead;
