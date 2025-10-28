const db = require("../database/database.js");
// omitted employee from the function name compared to lecture.
function getSkillsById(id) {
  return db
    .prepare(
      `
        select skills.name as skill
        from employee_skills
        inner join skills on employee_skills.skill_id = skills.id
        where employee_skills.employee_id = ?
        `
    )
    .all(id);
}

module.exports = getSkillsById;
