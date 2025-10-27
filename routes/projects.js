const express = require("express");
const router = express.Router();
const getProjectsWithEmployees = require("../queries/projectsWithEmployees.js");

router.get("/active-projects", (req, res) => {
  const data = getProjectsWithEmployees();
  res.json(data);
});

module.exports = router;
