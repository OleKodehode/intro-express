const express = require("express");
const router = express.Router();
const getEmployeeSkills = require("../queries/employeesWithSkills.js");
const getSkillsById = require("../queries/skillsByEmployeeId.js");

router.get("/", (req, res) => {
  const data = getEmployeeSkills();
  res.json(data);
});

router.get("/:id", (req, res) => {
  const employeeID = req.params.id;
  const data = getSkillsById(employeeID);
  res.json(data);
});

module.exports = router;
