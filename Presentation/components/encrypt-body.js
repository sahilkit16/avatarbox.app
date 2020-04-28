function encryptUserPassword() {
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(`-----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAst9ojzFYsTH9pxqJJbz1
    MaqXmniV5PB98dgMFVCaguggtlTL3IgBZPTm7ga2/aP9vjRxi892nJoDzVfwSdKw
    qIDLo8JKmo/erfk90lAro28eQWtUTd5gLhIHP6STKb+4xBYgqgN1kvRAd+vp77ZY
    Pr8qO27lIhz34bQOsk3DiWRMRS4skpTgNH47SXgiXfPj4C4Pe9qTmTQNlBpsuOl4
    9T346RhSVje6N3FChtmpzOucE3359bu8TNV9BMD+3uVIDfjPsMzKiPBCHNMoMc7z
    aE5RBtqf3hzgtazeSXW6G+v9WWC1bZVb7ukUXQUPB6f9VuqzJMmXDvwFfylduRcx
    oQIDAQAB
    -----END PUBLIC KEY-----`);
    const result = encrypt.encrypt(document.querySelector("#password").value);
    //document.querySelector("#ciphertext").value = result;
    console.log(result);
  }

function EncryptBody(props) {
    return (
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="column is-6 is-offset-3">
            <form className="box" method="post" action="/encrypt" >
              <div className="field is-grouped">
                <p id="email-input" className="control is-expanded">
                  <input 
                    className="input text"
                    id="password"
                    name="password" 
                    type="password" 
                    placeholder="&#xf084; Your Gravatar Password"
                  />
                </p>
                <p className="control">
                  <button
                    type="submit"
                    className="button is-info"
                    onClick={encryptUserPassword}
                  >
                    Submit
                  </button>
                  <noscript className="is-hidden">
                    <input name="isProgressive" readOnly={true} value={true} />
                  </noscript>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
  
  export default EncryptBody;
  