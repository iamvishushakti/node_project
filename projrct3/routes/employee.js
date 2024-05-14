const express = require('express');
const { createEmployee, getEmployee, deleteEmployee, updateEmployee } = require('../controllers/employee');
// const employee = require('../models/employee');


const router = express.Router();
router.route('/')
    .post(createEmployee)
    .get(getEmployee)
    .delete(deleteEmployee)
    .patch(updateEmployee);

module.exports = router;