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
              <p id="email-input" className="control is-expanded step-1">
                <input className="input email" name="email" type="email" placeholder="&#xf003; Email Address" />
              </p>
              <p className="control is-expanded step-2">
                <input 
                  className="input text" 
                  name="ciphertext" 
                  type="password" 
                  placeholder="&#xf084; Password Ciphertext"
                  title="Do not type your password here. Use an encrypted value instead."
                />
              </p>
              <p className="control">
                <button
                  type="submit"
                  className="button is-info"
                >
                  <span className="step-1">Get Started</span>
                  <span className="step-2">Submit</span>
                </button>
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
