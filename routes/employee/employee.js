const express = require("express");
const router = express.Router();

const customerObj = require("../../controllers/employee/employee-controller");

// // Employee Api
router.post("/addEmployee", customerObj.add_employee);
router.post("/editEmployeedata", customerObj.editEmployeedata);
router.post("/deleteemployee", customerObj.deleteEmployee);
router.post("/getEmployeeWithId", customerObj.getEmployeeWithId);
router.post("/getAllEmployee", customerObj.getAllEmployee);

module.exports = router;
