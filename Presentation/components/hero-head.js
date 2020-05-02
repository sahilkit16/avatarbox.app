import Head from 'next/head';
import NavBar from './navbar';
import NavBarView from '../view-models/_navbar';

// TODO: use context to avoid user prop drilling
// https://reactjs.org/docs/context.html

function HeroHead(props) {
  const model = new NavBarView();
  model.user = props.user;
  return (
    <div className="hero-head">
      <Head>
        <title>{props.title}</title>
        <link rel="stylesheet" type="text/css" href="../css/landing.css"/>
      </Head>
      <NavBar model={model} />
    </div>
  );
}

export default HeroHead;
