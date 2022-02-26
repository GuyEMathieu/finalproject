var mongoose = require('mongoose');

//Department.js
var departmentSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

},{
    timestamps: true
})

module.exports = mongoose.model('Department', departmentSchema);