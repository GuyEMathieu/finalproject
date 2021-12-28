var mongoose = require('mongoose');

//DriverLicense.js
var driverLicenseSchema = new mongoose.Schema({

    dlState: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'states'
    },
    dlNumber: {
        type: String,
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'employees'
    },

    lastModified: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('DriverLicense', driverLicenseSchema);