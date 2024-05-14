const mongoose = require('mongoose');

async function connectMongooseDb() {
    return mongoose.connect('mongodb://localhost:27017/employee');
}

module.exports = {
    connectMongooseDb,
};