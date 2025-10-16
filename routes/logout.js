const express = require("express");
const router = express.Router();
const logoutController = require("../controller/logoutController.js");

router.post("/", logoutController.handleLogout);

module.exports = router;
