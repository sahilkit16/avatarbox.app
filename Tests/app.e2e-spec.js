const request = require("supertest");
const { app } = require("../Presentation/app");
const container = require("../Common/di-container");

const cacheService = container.resolve("cacheService");
const dataStore = container.resolve("dataStore");

let server;

describe("app", () => {
  beforeAll((done) => {
    // bind to port manually so we can disconnect explicitly
    // https://github.com/visionmedia/supertest/issues/520
    server = app.listen(4000, (err) => {
      if (err) return done(err);
       request.agent(server);
       done();
    });
  });
  it("should work", async () => {
    request(app)
      .get("/")
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
      });
  });
  afterAll((done) => {
    dataStore.disconnect();
    cacheService.disconnect();
    return server && server.close(done);
  });
});
