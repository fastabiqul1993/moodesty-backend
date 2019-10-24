require("dotenv/config");
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const routerRoot = require("./src/routes/root");

const app = express();
const port = process.env.PORT || 5000;
const nodeEnv = process.env.NODE_ENV || "production";

app.listen(port, () => {
  console.log(`Server is running in ${nodeEnv} Mode on port ${port}`);
});

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routerRoot);

module.exports = app;
