const { config } = require("dotenv");
const { exec } = require("child_process");

config();

class RsaService {
  async encrypt(value) {
    return new Promise((resolve, reject) => {
      exec(
        `echo ${value} | openssl rsautl -encrypt -inkey ${
          process.env.PUBLIC_KEY_PATH
        } -pubin | base64 -w 0`,
        (err, stdout) => {
          if (err) return reject(err);
          resolve(stdout.trim());
        }
      );
    });
  }
  async decrypt(ciphertext) {
    return new Promise((resolve, reject) => {
      exec(
        `echo ${ciphertext.trim()} | base64 -d | openssl rsautl -decrypt -inkey ${
          process.env.PRIVATE_KEY_PATH
        }`,
        (err, stdout) => {
          if (err) return reject(err);
          resolve(stdout.trim());
        }
      );
    });
  }
}

module.exports = RsaService;
