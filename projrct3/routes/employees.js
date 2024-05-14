const express = require('express');
// const employee = require('../models/employee');
const { getAllEmployees } = require('../controllers/employee');

const router = express.Router();

router.get('/', getAllEmployees);

module.exports = router;