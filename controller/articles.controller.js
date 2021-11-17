const {
  fetchArticles,
  fetchArticle,
  fetchCommentsByArticle,
  updateArticle,
  insertComment,
} = require("../models/articles.model");

exports.getArticles = (req, res, next) => {
  const { sort_by, order, topic, limit, offset } = req.query;

  fetchArticles(sort_by, order, topic, limit, offset)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticle = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticle(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getCommentsByArticle = (req, res, next) => {
  const { article_id } = req.params;
  fetchCommentsByArticle(article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticle = (req, res, next) => {
  const { article_id } = req.params;
  const payload = req.body;

  updateArticle(article_id, payload)
    .then((article) => {
      res.status(201).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postComment = (req, res, next) => {
  const { article_id } = req.params;
  const payload = req.body;

  insertComment(article_id, payload)
    .then((comment) => {
      res.status(200).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};


