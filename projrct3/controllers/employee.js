const employee = require('../models/employee');

async function getAllEmployees(req, res) {
    response = await employee.find();
    res.status(200).json({ data: response });
}

async function createEmployee(req, res) {
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
}

async function getEmployee(req, res) {
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
}


async function deleteEmployee(req, res) {
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
}

async function updateEmployee(req, res) {
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
}

module.exports = {
    getAllEmployees,
    createEmployee,
    getEmployee,
    deleteEmployee,
    updateEmployee
}