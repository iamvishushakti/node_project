const fs = require('fs');

async function adminhomepage(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(fs.readFileSync('../project6/views/admin/index.html', 'utf-8'));
    res.end();
}

async function adminlogin(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(fs.readFileSync('../project6/views/admin/login.html', 'utf-8'));
    res.end();
}

module.exports = {
    adminhomepage,
    adminlogin
}