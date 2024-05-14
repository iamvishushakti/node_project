const express = require('express');
const { adminhomepage, adminlogin } = require('../controllers/pages');

const router = express.Router();

router.get('/', adminhomepage);
router.get('/login', adminlogin);

module.exports = router;