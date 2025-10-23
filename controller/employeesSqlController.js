const {
  addEmployee,
  getAllEmployees,
  getEmployeeByID,
  updateEmployee,
  deleteEmployee,
} = require("../services/employeeServices.js");

const handleAddEmployee = (req, res) => {
  const { first_name, last_name, job_title } = req.body;
  console.log("Foo");

  if (!first_name || !last_name || !job_title) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const result = addEmployee({ first_name, last_name, job_title });
    res.status(201).json({
      message: "Employee added successfully.",
      employee: {
        id: result.lastInsertRowid,
        first_name,
        last_name,
        job_title,
      },
    });
  } catch (err) {
    console.error("Database error:", err.message);
    res.status(500).json({ error: "Failed to add employee" });
  }
};

const handleGetAllEmployees = (req, res) => {
  console.log("handle get all employess has been called.");
  try {
    console.log("trying to get all employees");
    const employees = getAllEmployees();
    console.log("employees has been fetched:", employees);
    res.json(employees);
  } catch (err) {
    console.error("Database Error: ", err.message);
    res
      .status(500)
      .json({ error: "Failed to get all employees from the database." });
  }
};

const handleGetEmployeeByID = (req, res) => {
  const { id } = req.params;

  try {
    const employee = getEmployeeByID(id);
    if (!employee)
      return res.status(404).json({ error: "Employee not found." });
    res.json(employee);
  } catch (err) {
    console.error("Database Error: ", err.message);
    res.status(500).json({
      error: "Failed to get the requested employee from the database.",
    });
  }
};

const handleUpdateEmployee = (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, job_title } = req.body;

  if (!first_name || !last_name || !job_title)
    res.status(400).json({ error: "All fields required." });

  try {
    const result = updateEmployee(id, { first_name, last_name, job_title });

    if (result.changes === 0)
      return res.status(404).json({ error: "No changes made" });

    res.json({ message: "Employee information updated." });
  } catch (er) {
    console.error("Database Error: ", err.message);
    res.status(500).json({
      error: "Failed to update the employee.",
    });
  }
};

const handleDeleteEmployee = (req, res) => {
  const { id } = req.params;

  try {
    const result = deleteEmployee(id);
    if (result.changes === 0)
      return res.status(404).json({ error: "Employee not found." });
    res.json({ message: "Employee deleted." });
  } catch (err) {
    console.error("Database Error: ", err.message);
    res.status(500).json({
      error: "Failed to delete the employee.",
    });
  }
};

module.exports = {
  handleAddEmployee,
  handleGetAllEmployees,
  handleGetEmployeeByID,
  handleUpdateEmployee,
  handleDeleteEmployee,
};
