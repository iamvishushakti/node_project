const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
app = new express();

//connect Mongoose DB
mongoose.connect('mongodb://localhost:27017/employee').then(() => {
    console.log('connect by mongoose DB')
}).catch(err => console.log("error-" + err));

//Schema of Mongoose DB
const employeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    jobTitle: {
        type: String
    },
    gender: {
        type: String
    },
    email_status: {
        type: String
    }
});

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    token: {
        type: String,
    },
    time: {
        type: String,
    }
});

//Model in Mongoose
const employee = mongoose.model("employee", employeeSchema);
const userLogin = mongoose.model("user", userSchema);

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));
app.use(cors({ origin: true }));

//start the routing
app.get('/api/employees', async(req, res) => {
    response = await employee.find();
    res.status(200).json({ data: response });
});

// app.post('/api/employee', async(req, res) => {
//     body = req.body;
//     if (body.email != undefined && body.firstName != undefined && body.lastName != undefined && body.jobTitle != undefined && !body.gender != undefined) {
//         response = await employee.find({ email: body.email });

//         if (response.length > 0) {
//             res.status(200).json({ status: 'Error', data: response[0].email + ' Already Exists' });
//         } else {
//             response = await employee.create({
//                 firstName: body.firstName,
//                 lastName: body.lastName,
//                 email: body.email,
//                 jobTitle: body.jobTitle,
//                 gender: body.gender
//             });
//             res.status(201).json({ id: response._id });
//         }

//     } else {
//         res.status(200).json({ status: 'error', data: body });
//     }
// });

app.route('/api/employee')
    .post(async(req, res) => {
        body = req.body;
        body.email_status == '';
        if (body.email != undefined && body.email != '' && body.firstName != undefined && body.firstName != '' && body.lastName != undefined && body.lastName && body.jobTitle != undefined && body.jobTitle != '' && body.gender != undefined) {
            response = await employee.find({ email: body.email });
            if (response.length > 0) {
                res.status(200).json({ status: 'Error', message: response[0].email + ' Already Exists' });
            } else {
                response = await employee.create({
                    firstName: body.firstName,
                    lastName: body.lastName,
                    email: body.email,
                    jobTitle: body.jobTitle,
                    gender: body.gender
                });
                res.status(201).json({ status: 'Success', id: response._id });
            }
        } else {
            res.status(200).json({ status: 'Error', message: 'Please Enter All Required Field' });
        }
    })
    .get(async(req, res) => {
        if (req.query.email != undefined) {
            response = await employee.find({ email: req.query.email });
            if (response.length > 0) {
                res.json({ status: 'Success', data: response });
            } else {
                res.json({ status: 'Error', email: req.query.email + ' record are not found' });
            }
        } else {
            res.json({ status: 'Error', email: "must be pass email id value in query parameter" });
        }
    })
    .delete(async(req, res) => {
        if (req.query.email != undefined) {
            response = await employee.find({ email: req.query.email });
            if (response.length > 0) {
                await employee.deleteOne({ email: req.query.email });
                res.json({ status: 'Success', message: req.query.email + ' record deleted successfully...' });
            } else {
                res.json({ status: 'Error', email: req.query.email + ' record are not found' });
            }
        } else if (req.body.email != undefined && req.body.email != '') {
            response = await employee.find({ email: req.body.email });
            if (response.length > 0) {
                await employee.deleteOne({ email: req.body.email });
                res.json({ status: 'Success', message: req.body.email + ' record deleted successfully...' });
            } else {
                res.json({ status: 'Error', email: req.body.email + ' record are not found' });
            }
        } else {
            res.json({ status: 'Error', email: "must be pass email id value in query parameter" });
        }
    })
    .patch(async(req, res) => {
        if (req.body.email != undefined) {
            response = await employee.find({ email: req.body.email });
            if (response.length > 0) {
                //await employee.deleteOne({ email: req.body.email });

                update_value = {};
                (req.body.firstName != undefined) ? update_value['firstName'] = req.body.firstName: '';
                (req.body.lastName != undefined) ? update_value['lastName'] = req.body.lastName: '';
                (req.body.jobTitle != undefined) ? update_value['jobTitle'] = req.body.jobTitle: '';
                (req.body.gender != undefined) ? update_value['gender'] = req.body.gender: '';

                response = await employee.updateOne({ email: req.body.email }, { $set: update_value });
                res.json({ status: 'Success', message: 'updated Successfully..' });
            } else {
                res.json({ status: 'Error', email: req.body.email + ' record are not found' });
            }
        } else if (req.query.email != undefined && req.query.email != '') {
            response = await employee.find({ email: req.query.email });
            if (response.length > 0) {
                //await employee.deleteOne({ email: req.body.email });

                update_value = {};
                (req.body.firstName != undefined) ? update_value['firstName'] = req.body.firstName: '';
                (req.body.lastName != undefined) ? update_value['lastName'] = req.body.lastName: '';
                (req.body.jobTitle != undefined) ? update_value['jobTitle'] = req.body.jobTitle: '';
                (req.body.gender != undefined) ? update_value['gender'] = req.body.gender: '';

                response = await employee.updateOne({ email: req.query.email }, { $set: update_value });
                res.json({ status: 'Success', message: 'updated Successfully..' });
            } else {
                res.json({ status: 'Error query', email: req.query.email + ' record are not found' });
            }
        } else {
            res.json({ status: 'Error', message: "email id are not exist" });
        }
    });

app.route('/api/user')
    .post(async(req, res) => {
        body = req.body;
        body.email_status == '';
        if (body.email != undefined && body.email != '' && body.firstName != undefined && body.firstName != '' && body.lastName != undefined && body.lastName != '' && body.password != undefined && body.password != '') {
            response = await userLogin.find({ email: body.email });
            if (response.length > 0) {
                res.status(200).json({ status: 'Error', message: response[0].email + ' Account Already Exists' });
            } else {
                response = await userLogin.create({
                    firstName: body.firstName,
                    lastName: body.lastName,
                    email: body.email,
                    password: body.password,
                    token: '',
                    time: ''
                });
                res.status(201).json({ status: 'Success', id: response._id });
            }
        } else {
            res.status(200).json({ status: 'Error', message: 'Please Enter All Required Field' });
        }
    });

app.route('/api/user/login').post(async(req, res) => {
    response = await userLogin.find({ email: req.body.id, password: req.body.key });
    if (response.length > 0) {
        token = String(new Date().getTime()) + response[0]._id
        response = await userLogin.updateOne({ email: req.body.id, password: req.body.key }, { $set: { 'token': token, time: new Date().getTime() } });
        res.json({ status: 'Success', 'token': token });
    } else {
        res.json({ status: 'Error', 'message': 'Id And Pass Are Invalid, Pass Again' });
    }
});


app.listen(8300);