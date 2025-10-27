const express = require("express");
const router = express.Router();
const getEmployeeSkills = require("../queries/employeesWithSkills.js");

router.get("/", (req, res) => {
  const data = getEmployeeSkills();
  res.json(data);
});

module.exports = router;
