const express = require('express');
const fs = require('fs');

const router = express.Router();

router.route('/assets/:type/:filetype')
    .get((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/js' });
        res.write(fs.readFileSync('../project6/' + req.url, 'utf-8'));
        res.end();
    })

module.exports = router;