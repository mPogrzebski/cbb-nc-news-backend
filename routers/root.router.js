const apiRouter = require("./api.router");

const rootRouter = require("express").Router();

rootRouter.use("/api", apiRouter);

rootRouter.all("/*", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});

module.exports = rootRouter;
