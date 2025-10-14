const usersDB = {
  users: require("../model/users.json"),
  setUsers: (data) => {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");
