const db = require("../connection");
const format = require("pg-format");
const { getValuesFromObject } = require("../utils/data-manipulation");

exports.seedUsers = async (userData) => {
  const formatedData = getValuesFromObject(userData);

  const querryString = format(
    `INSERT INTO users (username, name, avatar_url) VALUES %L RETURNING *;`,
    formatedData
  );

  await db.query(querryString);
  // console.log("Users table seeded");
};

exports.seedTopics = async (topicData) => {
  const formatedData = getValuesFromObject(topicData);

  const querryString = format(
    `INSERT INTO topics (description, slug) VALUES %L RETURNING *;`,
    formatedData
  );

  await db.query(querryString);
  // console.log("Topics table seeded");
};

exports.seedArticles = async (articleData) => {
  const formatedData = getValuesFromObject(articleData);

  const querryString = format(
    `INSERT INTO articles (title, topic, author, body, created_at,votes) VALUES %L RETURNING *;`,
    formatedData
  );

  await db.query(querryString);
  // console.log("Articles table seeded");
};

exports.seedComments = async (commentData) => {
  const formatedData = getValuesFromObject(commentData);

  const querryString = format(
    `INSERT INTO comments (body, votes, author, article_id, created_at) VALUES %L RETURNING *;`,
    formatedData
  );

  const s = await db.query(querryString);
  // console.log("Comments table seeded");
};
