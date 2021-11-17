const db = require("../connection");

exports.dropTables = async () => {
  await db.query("DROP TABLE IF EXISTS articles, comments, topics, users");
  // console.log("Tables dropped");
};

exports.createUsersTables = async () => {
  await db.query(
    `CREATE TABLE users (
                    username VARCHAR(100) NOT NULL PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    avatar_url VARCHAR(255) NOT NULL );`
  );
  // console.log("Table 'users' created");
};

exports.createTopicsTable = async () => {
  await db.query(
    `CREATE TABLE topics (
                              slug VARCHAR(255) NOT NULL PRIMARY KEY,
                              description TEXT NOT NULL
                              );`
  );
  // console.log("Table 'topics' created");
};

exports.createArticlesTable = async () => {
  await db.query(
    `CREATE TABLE articles (
                                            article_id SERIAL PRIMARY KEY,
                                            topic VARCHAR(100) NOT NULL,
                                            title VARCHAR(255) NOT NULL,
                                            author VARCHAR(100) REFERENCES users(username),
                                            body TEXT NOT NULL,
                                            created_at TIMESTAMP DEFAULT NOW(),
                                            votes SMALLINT DEFAULT 0

      );`
  );
  // console.log("Created 'articles' table");
};

exports.createCommentsTable = async () => {
  await db.query(
    `CREATE TABLE comments (
                                              comment_id SERIAL PRIMARY KEY,
                                              body TEXT NOT NULL,
                                              votes SMALLINT DEFAULT 0,
                                              author VARCHAR(100) NOT NULL REFERENCES users(username),
                                              article_id INT REFERENCES articles(article_id) ON DELETE CASCADE,
                                              created_at TIMESTAMP DEFAULT NOW()
      );`
  );
  // console.log("Created 'comments' table");
};
