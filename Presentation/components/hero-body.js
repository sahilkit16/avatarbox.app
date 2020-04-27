function HeroBody(props) {
  return (
    <div className="hero-body">
      <div className="container has-text-centered">
        <div className="column is-6 is-offset-3">
          <h1 className="title">
            {props.headline}
          </h1>
          <h2 className="subtitle">
            {props.proposition}
          </h2>
          <form className="box" method="post" action="/register" >
            <div className="field is-grouped">
              <p className="control is-expanded">
                <input className="input email" name="email" type="email" placeholder="&#xf003; Email Address" />
              </p>
              <p className="control">
                <input
                  type="submit"
                  value="Get Started"
                  className="button is-info"
                />
                <noscript className="is-hidden">
                  <input name="isProgressive" value="true" />
                </noscript>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HeroBody;
