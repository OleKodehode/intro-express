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

db.prepare(
  `create table if not exists projects(
  id integer primary key autoincrement,
  employee_id integer not null,
  project_name text not null,
  deadline text,
  foreign key (employee_id) references employees(id))`
).run();

db.prepare(
  `create table if not exists skills(
  id integer primary key autoincrement,
  name text not null unique)`
).run();

db.prepare(
  `create table if not exists employee_skills(
  employee_id integer not null,
  skill_id integer not null,
  primary key (employee_id, skill_id),
  foreign key (employee_id) references employees(id),
  foreign key (skill_id) references skills(id))`
).run();

module.exports = db;
