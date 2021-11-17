exports.psqlError = (err, req, res, next) => {
  
  if (err.code == 42703 || err.code == '22P02') {
    res.status(400).send({ msg: "bad request" });
  } else {
    next(err);
  }
};

exports.generalError = (err, req, res, next) => {

  if (err.status == 400 || err.status == 406 || err.status == 404) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.serverError = (err, req, res, next) => {
  console.log(err);
  res.sendStatus(500);
};
