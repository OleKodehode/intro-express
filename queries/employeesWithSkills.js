const db = require("../database/database.js");

function getEmployeesWithSkills() {
  return db
    .prepare(
      `
    select employees.first_name, employees.last_name, skills.name as skill 
    from employees
    inner join employee_skills on employees.id = employee_skills.employee_id
    inner join skills on employee_skills.skill_id = skills.id;
    `
    )
    .all();
}

module.exports = getEmployeesWithSkills;
