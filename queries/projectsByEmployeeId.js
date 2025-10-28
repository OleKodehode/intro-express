const db = require("../database/database.js");
// omitted employee from function name compared to the lecture.
function getProjectsByID(id) {
  return db
    .prepare(
      `
        select project_name, deadline
        from projects
        where employee_id = ?;
        `
    )
    .all(id);
}

module.exports = getProjectsByID;
