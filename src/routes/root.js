const express = require("express");
const spotify = require("./spotify");

const router = express.Router();

router.use("/", spotify);

module.exports = router;
