const express = require("express");
const router = express.Router();
const refreshController = require("../controller/refreshController.js");

router.post("/", refreshController.handleRefreshToken);

module.exports = router;
