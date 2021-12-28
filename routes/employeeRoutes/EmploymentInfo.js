var mongoose = require('mongoose');

var EmploymentSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'employees'
    },
    employeeNum: {
        type: Number,
        required: true
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'departments'
    },
    position: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'positions'
    },
    startDate:{
        type: Date,
    },
    employmentStatus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employmentstatuses'
    },
    daysOff: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dayoffs'
    },
    salary: {
        type: Number
    },

    lastModified: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('EmploymentInfo', EmploymentSchema);