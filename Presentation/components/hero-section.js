function HeroSection(props) {
  return (
    <section id="hero" className={`hero ${props.hideCoverImage ? "is-light" : "is-info" } is-fullheight`}>
      {props.children}
    </section>
  );
}

export default HeroSection;
