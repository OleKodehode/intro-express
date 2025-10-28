const db = require("../database/database.js");

function getLatestProjects() {
  return db
    .prepare(
      `
        select project_name, deadline 
        from projects
        order by deadline desc
        limit 5;
        `
    )
    .all();
}

module.exports = getLatestProjects;
