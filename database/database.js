const path = require("path");
const Database = require("better-sqlite3");

const dbPath = path.join(__dirname, "companyEmployees.sqlite");
console.log(dbPath);
const db = new Database(dbPath, { verbose: console.log });

db.prepare(
  `create table if not exists employees(
    id integer primary key autoincrement,
    first_name text not null,
    last_name text not null,
    job_title text not null)`
).run();

console.log("Table Created");

module.exports = db;
