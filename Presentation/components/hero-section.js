function HeroSection(props) {
  return (
    <section id="hero" className="hero is-info is-fullheight">
      {props.children}
    </section>
  );
}

export default HeroSection;
