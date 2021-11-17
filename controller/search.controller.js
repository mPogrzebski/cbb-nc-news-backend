const { fetchSearch } = require("../models/search.model");

exports.getSearch = (req, res, next) => {
  const { searchWord } = req.query;

  fetchSearch(searchWord)
    .then((query) => {
      res.status(200).send({ query });
    })
    .catch((err) => {
      next(err);
    });
};
