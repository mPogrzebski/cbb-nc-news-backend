const searchRouter = require("express").Router();

const { getSearch } = require("../controller/search.controller");

searchRouter.route("/").get(getSearch);

module.exports = searchRouter;
