const cors = require("cors");

const express = require("express");
const { generalError, psqlError, serverError } = require("./errors/errors");
const rootRouter = require("./routers/root.router");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", rootRouter);

app.use(generalError);
app.use(psqlError);
app.use(serverError);

module.exports = app;
