const express = require("express");
const router = express.Router();
const path = require("path");
const employeesController = require("../../controller/employeesController.js");
const ROLES_LIST = require("../../config/roles_list.js");
const verifyRoles = require("../../middleware/verifyRoles.js");

router
  .route("/")
  .get(employeesController.getAllEmployees())
  .post(verifyRoles(ROLES_LIST.Admin), employeesController.createNewEmployee())
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeesController.updateEmployee()
  )
  .delete(verifyRoles(ROLES_LIST.Admin), employeesController.deleteEmployee);

router.route("/:id").get(employeesController.getSingleEmployee);

module.exports = router;
