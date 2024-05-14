const express = require('express');
const { connectMongooseDb } = require('./connection');
const employees = require('./routes/employees');
const employee = require('./routes/employee');
const pages = require('./routes/adminpages');
const admin = require('./routes/admin');
const assets = require('./routes/assets');
const cookieParser = require('cookie-parser');


const auth = require('./auth.json');
const fs = require('fs');
const cors = require('cors');


connectMongooseDb();

app = new express();
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));
app.use(cors({ origin: true }));


app.use('/', assets);
// app.use('/api/admin/login', admin);
// Middle Where

app.use((req, res, next) => {
    // res.send(req.cookies);
    // res.end();
    // cookie = getCookie(req);
    // console.log(req.cookies);
    if (req.cookies.auth === undefined && req.url != '/admin/login/' && req.url != '/api/admin/login') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<span>Session Expire.. Click Here <a href="/admin/login/">Go to</a> Home Page</span>', 'utf-8');
        res.end('');
    } else {
        next();
    }

});

//call Route
app.use('/admin', pages);
app.use('/api/admin', admin);
app.use('/api/employees', employees);
app.use('/api/employee', employee);




app.listen(8300);