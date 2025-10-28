const express = require("express");
const router = express.Router();
const getProjectsWithEmployees = require("../queries/projectsWithEmployees.js");
const getProjectsByID = require("../queries/projectsByEmployeeId.js");
const getLatestProjects = require("../queries/latestProjects.js");

router.get("/", (req, res) => {
  const data = getProjectsWithEmployees();
  res.json(data);
});

router.get("/:id", (req, res) => {
  const employeeID = req.params.id;
  const data = getProjectsByID(employeeID);

  res.json(data);
});

router.get("/latest", (req, res) => {
  res.json(getLatestProjects());
});

module.exports = router;
