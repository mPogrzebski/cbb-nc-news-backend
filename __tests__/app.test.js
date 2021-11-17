const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const request = require("supertest");
const app = require("../app.js");
const fs = require("fs");

const endpoints = JSON.parse(fs.readFileSync("./endpoints.json", "utf-8"));

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("/api", () => {
  test("Should return code 200 and message", async () => {
    const res = await request(app).get("/api").expect(200);
    expect(res.body).toEqual(endpoints);
  });

  describe("/api/topics", () => {
    test("Should return code 200 and list of topics", async () => {
      const res = await request(app).get("/api/topics").expect(200);
      expect("topics" in res.body).toEqual(true);
      expect(res.body.topics.length).not.toBe(0);
      res.body.topics.forEach((topic) => {
        expect(topic).toMatchObject({
          description: expect.any(String),
          slug: expect.any(String),
        });
      });
    });
  });

  describe("/api/articles", () => {
    test("Should return code 200 and an array of articles", async () => {
      const res = await request(app).get("/api/articles").expect(200);
      expect("articles" in res.body).toEqual(true);
      expect(res.body.articles.length).not.toBe(0);

      res.body.articles.forEach((article) => {
        expect(article).toMatchObject({
          title: expect.any(String),
          topic: expect.any(String),
          author: expect.any(String),
          // body: expect.not,
          comment_count: expect.any(String),
          votes: expect.any(Number),
          article_id: expect.any(Number),
        });
      });
    });

    describe("GET /api/articles", () => {
      test("Should reject the request with code 400", async () => {
        const res = await request(app).get("/api/articles/1").expect(200);
        expect(res.body.article).toMatchObject({
          title: expect.any(String),
          topic: expect.any(String),
          author: expect.any(String),
          body: expect.any(String),
          votes: expect.any(Number),
          article_id: expect.any(Number),
        });
      });

      test("Should return code 200 and an array of articles sorted by article_id in descending order", async () => {
        const res = await request(app)
          .get("/api/articles?sort_by=article_id")
          .expect(200);
        expect("articles" in res.body).toEqual(true);
        expect(res.body.articles).toBeSorted({
          key: "article_id",
          descending: true,
        });
      });

      test("Should return code 400 on invalid sort_by query", async () => {
        const res = await request(app)
          .get("/api/articles?sort_by=banana")
          .expect(400);
      });

      test("Should return code 200 and an array of articles sorted by date in ascending  order", async () => {
        const res = await request(app)
          .get("/api/articles?sort_by=created_at&order=asc")
          .expect(200);
        expect("articles" in res.body).toEqual(true);
        expect(res.body.articles).toBeSorted({
          key: "created_at",
          descending: false,
        });
      });

      test("Should return code 400 on invalid order=bananas", async () => {
        const res = await request(app)
          .get("/api/articles?sort_by=created_at&order=bananas")
          .expect(400);
      });

      test("Should return code 404 and message while trying to access non existing article", async () => {
        const res = await request(app).get("/api/articles/99999").expect(404);
        expect(res.body.msg).toBe("Article does not exists");
      });

      test("Should return code 404 while trying to access bad article_id", async () => {
        const res = await request(app).get("/api/articles/bad_id").expect(400);
        expect(res.body.msg).toBe("bad request");
      });

      test("Should return code 200 and an array of comments for the given `article_id` of which each comment", async () => {
        const res = await request(app)
          .get("/api/articles/1/comments")
          .expect(200);
        expect("comments" in res.body).toEqual(true);
        expect(res.body.comments.length).not.toBe(0);
        res.body.comments.forEach((comment) => {
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            created_at: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            votes: expect.any(Number),
          });
        });
      });

      test("Should return code 400 on wrong article_id", async () => {
        const res = await request(app)
          .get("/api/articles/not-an-id/comments")
          .expect(400);
      });
    });

    describe("PATCH /api/articles", () => {
      test("Should reject the request with code 400", async () => {
        const res = await request(app)
          .patch("/api/articles/1")
          .send({ bad_body: 12 })
          .expect(400);

        expect(res.body.msg).toBe("Invalid payload");
      });

      test("Should accept the request with code 400", async () => {
        const res = await request(app)
          .patch("/api/articles/1")
          .send({ inc_votes: 10 })
          .expect(201);

        expect(res.body.article).toMatchObject({
          title: expect.any(String),
          topic: expect.any(String),
          author: expect.any(String),
          body: expect.any(String),
          votes: expect.any(Number),
          article_id: expect.any(Number),
        });
      });
    });

    describe("POST /api/articles/:article_id/comments", () => {
      test("Should return server error on passing request with wrong username ", async () => {
        const res = await request(app)
          .post("/api/articles/1/comments")
          .send({ username: "BadUser", body: "blah blah" })
          .expect(400);
      });

      test("Should return server error on invalid article  ", async () => {
        const res = await request(app)
          .post("/api/articles/9999/comments")
          .send({ username: "BadUser", body: "blah blah" })
          .expect(400);
      });

      test("Should return server error on passing request with wrong username ", async () => {
        const res = await request(app)
          .post("/api/articles/1/comments")
          .send({ username: "butter_bridge", body: "blah blah" })
          .expect(200);

        expect(res.body.comment).toMatchObject({
          body: "blah blah",
          votes: 0,
          author: "butter_bridge",
          article_id: 1,
          created_at: expect.any(String),
        });
      });
    });
  });
});
