const database = require("../database/database.js");

function getProjectsWithEmployees() {
  return db
    .prepare(
      `
        select projects.project_name projects.deadline, employees.first_name, employees.last_name
        from projects
        inner join employees on projects.employee_id = employees.id;`
    )
    .all();
}

module.exports = getProjectsWithEmployees;
