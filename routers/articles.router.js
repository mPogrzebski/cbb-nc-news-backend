const articlesRouter = require("express").Router();

const {
  getArticles,
  getArticle,
  getCommentsByArticle,
  patchArticle,
  postComment,
} = require("../controller/articles.controller");

articlesRouter
  .route("/")
  .get(getArticles);

articlesRouter
  .route("/:article_id")
  .get(getArticle)
  .patch(patchArticle);

articlesRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticle)
  .post(postComment);

module.exports = articlesRouter;
