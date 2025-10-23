const db = require("../database/database.js");

function addEmployee({ first_name, last_name, job_title }) {
  const stmt = db.prepare(
    "INSERT INTO employees (first_name, last_name, job_title) VALUES(?,?,?)"
  );
  return stmt.run(first_name, last_name, job_title);
}

function getAllEmployees() {
  const stmt = db.prepare("SELECT * FROM employees");
  return stmt.all();
}

function getEmployeeByID(id) {
  const stmt = db.prepare("SELECT * FROM employees WHERE id = ?");
  return stmt.get(id);
}

function updateEmployee(id, { first_name, last_name, job_title }) {
  const stmt = db.prepare(
    "UDPATE employees SET first_name = ?, last_name = ?, job_title = ? WHERE id = ?"
  );
  return stmt.run(first_name, last_name, job_title, id);
}

function deleteEmployee(id) {
  const stmt = db.prepare("DELETE FROM employees WHERE id = ?");
  return stmt.run(id);
}

module.exports = {
  addEmployee,
  getAllEmployees,
  getEmployeeByID,
  updateEmployee,
  deleteEmployee,
};
