import Head from 'next/head';

function HeroSection(props) {
  return (
    <section className="hero is-info is-fullheight">
      <Head>
        <title>{props.title}</title>
      </Head>
      {props.children}
    </section>
  );
}

export default HeroSection;
