const format = require("pg-format");
const db = require("../db/connection");

const fetchSearch = async (searchWord = "") => {
  let queryString = `SELECT * FROM articles WHERE title ILIKE '%${searchWord}%';`;
  const result = await db.query(queryString);

  return result.rows;
};

module.exports = { fetchSearch };
