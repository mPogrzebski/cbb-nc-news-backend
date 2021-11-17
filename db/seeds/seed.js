
const {
  dropTables,
  createUsersTables,
  createTopicsTable,
  createArticlesTable,
  createCommentsTable,
} = require("./manage-tables");
const {
  seedUsers,
  seedTopics,
  seedArticles,
  seedComments,
} = require("./seeding");

const seed = async (data) => {
  const { articleData, commentData, topicData, userData } = data;
  // 1. create tables DONE
  // 2. insert data DONE
  await dropTables();

  try {
    await createUsersTables();
    await createTopicsTable();
    await createArticlesTable();
    await createCommentsTable();

    await seedUsers(userData);
    await seedTopics(topicData);
    await seedArticles(articleData);
    await seedComments(commentData);
  } catch (error) {
    console.log(error);
  }
};

module.exports = seed;
