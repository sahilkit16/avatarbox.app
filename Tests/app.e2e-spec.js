const request = require("supertest");
const { app } = require("../Presentation/app");
const DataStore = require("../Infrastructure/data-store");

const dataStore = new DataStore();

describe("app", () => {
  beforeAll(async () => {
    await dataStore.connect();
  });
  it("should work", () => {
    request(app)
      .get("/")
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
      });
  });
  afterAll((done) => {
    dataStore.disconnect(done);
  });
});
