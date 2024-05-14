const mongoose = require('mongoose');

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

employee = mongoose.model("employees", employeeSchema);

module.exports = employee;