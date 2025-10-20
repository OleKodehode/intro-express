// Helper file, not used in the actual server

const db = require("./database/database.js");

db.prepare("drop table if exists employees").run();
db.prepare(
  `create table employees(
    id integer primary key autoincrement,
    first_name text not null,
    last_name text not null,
    job_title text not null)`
).run();

console.log("Migration Complete");
