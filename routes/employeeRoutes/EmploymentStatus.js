var mongoose = require('mongoose');

//DriverLicense.js
var employmentStatusSchema = new mongoose.Schema({

    name: {
        type: String
    },

    lastModified: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('EmploymentStatus', employmentStatusSchema);