//Department.js

var mongoose = require('mongoose');

var departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    lastModified: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Department', departmentSchema);