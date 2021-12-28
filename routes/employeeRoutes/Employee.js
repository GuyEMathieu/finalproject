var mongoose = require('mongoose');

var EmployeeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    employeeNum: {
        type: Number,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String,
        required: true
    },
    dateOfBirth:{
        type: Date,
        required: true
    },
    email: {
        type: 'String'
    },
    phone: {
        type: String
    },
    gender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'genders'
    },
    ssn: {
        type: String,
        required: true
    },

    lastModified: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Employee', EmployeeSchema);