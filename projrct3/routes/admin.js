const express = require('express');
const auth = require('../auth.json');

const fs = require('fs');

const router = express.Router();


router.route('/login')
    .post((req, res) => {
        // res.writeHead(200, { 'Content-Type': 'text/js' });
        // res.write('i am ready');
        user = req.body.uname;
        pass = req.body.upass;

        user = auth.find((auth) => auth.id == user);
        if (user) {
            if (pass === user.pass) {
                res.cookie("auth", user.id);
                res.json({ 'status': 'success' });
            } else {
                res.json({ 'status': 'error', 'message': 'User password are not valid..' });
            }
        } else {
            res.json({ 'status': 'error', 'message': 'User id are not valid..' });
        }
        res.end();
    });

router.route('/logout')
    .get((req, res) => {
        res.clearCookie('auth');
        res.json({ status: 'success' });
        res.end();
    });

router.route('/user')
    .get((req, res) => {
        getAuth = req.cookies.auth;
        user = auth.find((auth) => auth.id == getAuth);
        res.json({ 'id': user.id, 'name': user.name });
        res.end();
    })
    .post((req, res) => {

        getAuth = req.cookies.auth;
        user = auth.find((auth) => auth.id == getAuth);

        pass_error = 1;

        if (req.body.userPassword1 != '') {
            if (req.body.userPassword1 == req.body.userPassword2) {
                user.pass = req.body.userPassword1;
                pass_error = 0;
            }
        }

        if (user.name != req.body.userFullName) {
            user.name = req.body.userFullName;
        }


        fs.writeFileSync('../project6/auth.json', JSON.stringify(auth));
        res.json({ status: 'success' });
        res.end();

    });

module.exports = router;