const request = require("supertest");
const app = require("../app.js");

describe("/", () => {
  test("Should return code 404 and message", async () => {
    const res = await request(app).get("/not-a-route").expect(404);
    expect(res.body).toEqual({ msg: "Route not found" });
  });
});
