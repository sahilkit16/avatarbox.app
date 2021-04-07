const { unauthorized } = require("../../middleware/unauthorized");
const gravatarClientScope = require("../../middleware/gravatar-client-scope");
const isAjax = require("../../middleware/is-ajax");

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

const useMiddleware = async function () {
  const use = (middleware) => runMiddleware(this.req, this.res, middleware);
  return Promise.all([
    use(unauthorized),
    use(isAjax),
    use(gravatarClientScope),
  ]);
};

module.exports = { runMiddleware, useMiddleware };
