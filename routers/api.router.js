const articlesRouter = require("./articles.router");
const topicsRouter = require("./topics.router");
const searchRouter = require("./search.router");

const fs = require("fs");

const endpoints = JSON.parse(fs.readFileSync("./endpoints.json", "utf-8"));

const apiRouter = require("express").Router();

// /api
apiRouter.get("/", (req, res) => {
  res.status(200).send(endpoints);
});

//api/topics
apiRouter.use("/topics", topicsRouter);

//api/articles
apiRouter.use("/articles", articlesRouter);

apiRouter.use("/search", searchRouter);

module.exports = apiRouter;
