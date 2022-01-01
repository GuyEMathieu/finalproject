var mongoose = require('mongoose');

var saleSchema = new mongoose.Schema({
    saleDate: {
        type: Date
    },

    lastModified: {
        type: Date,
        default: Date.now
    }
})

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
    employmentInfo:{
        startDate: {type: Date},
        employeeNumber: {type: Number},
        position: {type: String},
        salary: {type: String}
    },
    driverLicense: {
        dlNumber: {type: String},
        dlState: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'states'
        }
    },
    gender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'genders'
    },
    ssn: {
        type: String,
        required: true
    },
    address: {
        street: {type: String},
        aptNum: {type: String},
        city: {type: String},
        zipcode: {type: String},
        state: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'states'
        },
        country: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'countries'
        },
    },
    performance: {
        service: [],
        sales: [saleSchema]
    },
    lastModified: {
        type: Date,
        default: Date.now
    }
})



module.exports = mongoose.model('Employee', EmployeeSchema);