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
  document.querySelector("#ciphertext").value = result;
}

function Encrypt() {
  return (
    <form method="post">
      <input id="password" name="password" type="password" placeholder="Gravatar Password" />
      <input type="submit" value="Submit" onClick={encryptUserPassword} />
      {/* <textarea id="ciphertext" name="ciphertext" placeholder="ciphertext">
      </textarea> */}
    </form>
  );
}

export default Encrypt;
