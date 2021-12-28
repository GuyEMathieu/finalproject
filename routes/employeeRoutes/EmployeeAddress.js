var mongoose = require('mongoose');

var EmployeeAddressSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'employees'
    },
    street: {
        type: String,
    },
    aptNum:{
        type: String,
    },
    city: {
        type: String
    },
    zipcode: {
        type: String
    },
    state: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'states'
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'countries'
    },

    lastModified: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('EmployeeAddress', EmployeeAddressSchema);