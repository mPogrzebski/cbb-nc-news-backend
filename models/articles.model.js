const { response } = require("express");
const format = require("pg-format");
const db = require("../db/connection");

/**
 * 
 * Responds with:

  - an `articles` array of article objects, each of which should have the following properties:
  - `author` which is the `username` from the users table
  - `title`
  - `article_id`
  - `topic`
  - `created_at`
  - `votes`
  - `comment_count` which is the total count of all the comments with this article_id - you should make use of queries to the database in order to achieve this
  
  */
const fetchArticle = async (article_id) => {
  const article = await db.query(
    `SELECT a.*, COUNT(c.*) AS comment_count FROM articles a, comments c WHERE c.article_id = a.article_id AND a.article_id = $1 GROUP BY a.article_id;`,
    [article_id]
  );

  if (article.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "Article does not exists" });
  }

  return article.rows[0];
};

const updateArticle = async (article_id, payload) => {
  //Run db query
  const article = await db.query(
    `SELECT * FROM articles WHERE article_id = $1;`,
    [article_id]
  );
  // check if article exists
  if (article.rows.length === 0) {
    return Promise.reject({ status: 400, msg: "Invalid article" });
  }

  //check if payload is correct

  if (!("inc_votes" in payload) || typeof payload.inc_votes !== "number") {
    return Promise.reject({ status: 400, msg: "Invalid payload" });
  }

  const newVote = payload.inc_votes + article.rows[0].votes;

  const updatedArticle = await db.query(
    `UPDATE articles SET votes = votes + $1 WHERE article_id	= $2 RETURNING *;`,
    [payload.inc_votes, article_id]
  );

  if (newVote !== updatedArticle.rows[0].votes) {
    await db.query("ROLLBACK;]");
    return Promise.reject({ status: 400, msg: "Server error" });
  }
  return updatedArticle.rows[0];
};

const fetchArticles = async (
  sort_by = "created_at",
  order = "desc",
  topic,
  limit = 5,
  offset = 1
) => {
  if (validFetchArticlesInput(sort_by, order)) {
    return promiseReject(400, "bad request");
  }
  let queryString =
    "SELECT a.*, COUNT(c.*) AS comment_count FROM articles a, comments c WHERE c.article_id = a.article_id";

  if (topic) {
    queryString += ` AND a.topic = '${topic}'`;
  }

  queryString += ` GROUP BY a.article_id`;
  queryString += ` ORDER BY ${sort_by} ${order}`;

  if (limit) {
    queryString += ` LIMIT ${limit}`;
  }

  if (offset) {
    queryString += ` OFFSET ${offset}`;
  }

  queryString += `;`;
  const articles = await db.query(queryString);

  return articles.rows;
};

const fetchCommentsByArticle = async (article_id) => {
  const commentsByArticle = await db.query(
    `SELECT * FROM comments WHERE article_id = ${article_id}`
  );
  return commentsByArticle.rows;
};

const insertComment = async (article_id, { username, body }) => {
  //Run db query
  const article = await db.query(
    `SELECT * FROM articles WHERE article_id = $1;`,
    [article_id]
  );
  // check if article exists
  if (article.rows.length === 0) {
    return Promise.reject({ status: 400, msg: "Invalid article" });
  }

  const users = await db.query(` SELECT * FROM users WHERE username = $1;`, [
    username,
  ]);

  if (users.rows.length === 0) {
    return Promise.reject({ status: 400, msg: "Invalid user" });
  }

  const queryString = format(
    `INSERT INTO comments (body,author, article_id, created_at) VALUES %L RETURNING *;`,
    [[body, username, article_id, new Date(1586179020010)]]
  );

  const newComment = await db.query(queryString);

  return newComment.rows[0];
};

/**
 * HELPER FUNCTIONS
 */

const promiseReject = (status, message) => {
  return Promise.reject({ status, message });
};

validFetchArticlesInput = (sort_by, order) => {
  const validColumns = [
    "article_id",
    "topic",
    "title",
    "author",
    "body",
    "created_at",
    "votes",
    "comment_count",
  ];

  const validOrder = ["ASC", "DESC", "asc", "desc"];

  return !validColumns.includes(sort_by) || !validOrder.includes(order)
    ? true
    : false;
};

module.exports = {
  fetchArticles,
  fetchArticle,
  fetchCommentsByArticle,
  updateArticle,
  insertComment,
};

