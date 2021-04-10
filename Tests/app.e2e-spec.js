const request = require("supertest");
const { createServer } = require("http");
const next = require("next");
const app = next({ dev: false, dir: "Presentation" });
const handler = app.getRequestHandler();

describe("app", () => {
  let server = null;
  beforeAll((done) => {
    app
      .prepare()
      .then(() => {
        const port = 8080;
        server = createServer(handler).listen(port, (err) => {
          if (err) throw err;
          done();
        });
        request.agent(server);
      })
      .catch((err) => done(err));
  });
  it("should get root", async () => {
    request(server).get("/").expect(200);
  });
  it("should get /health", async () => {
    request(server).get("/health").expect(200);
  });
  afterAll(async () => {
    await server.close();
  });
});
