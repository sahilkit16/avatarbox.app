import React from 'react';
import Head from 'next/head';

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

class Encrypt extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <section class="hero is-success is-fullheight">
        <Head>
          <title>Encryption Tool | Avatar Box</title>
          <link rel="stylesheet" type="text/css" href="../css/encrypt.css"/>
        </Head>
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                    <h3 class="title has-text-black">Encryption Tool</h3>
                    <hr class="login-hr"/>
                    <p class="subtitle has-text-black">Please encrypt your password</p>
                    <div class="box">
                        <figure class="avatar">
                            <img src="../images/lock.jpeg" width="128" height="128"/>
                        </figure>
                        <form method="post" action="/encrypt">
                            <div class="field">
                                <div class="control">
                                    <input class="input is-large" id="password" name="password" type="password" placeholder="Password"/>
                                </div>
                            </div>
                            <button type="submit" class="button is-block is-info is-large is-fullwidth">Encrypt <i class="fa fa-random" aria-hidden="true"></i></button>
                        </form>
                    </div>
                    <p class="has-text-grey">
                        <a href="/">Home</a> &nbsp;·&nbsp;
                        <a href="https://bitbucket.org/mrtillman/avatarbox.web/wiki/Authentication">Need Help?</a>
                    </p>
                </div>
            </div>
        </div>
      </section>
    );
  }
}

export default Encrypt;
