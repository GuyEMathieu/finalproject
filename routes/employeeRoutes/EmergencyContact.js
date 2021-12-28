var mongoose = require('mongoose');

//EmergencyContact.js
var emergencyContactSchema = new mongoose.Schema({

    firstName: {
        type: String,
    },

    lastName: {
        type: String,
    },
    phone: {
        type: String
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'employees'
    },
    relationship: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employeerelations'
    },


    lastModified: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('EmergencyContact', emergencyContactSchema);