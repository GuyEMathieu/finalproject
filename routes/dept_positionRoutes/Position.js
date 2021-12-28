//Position.js

var mongoose = require('mongoose');

var positionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    department: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'departments',
        required: true
    },
    lastModified: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Position', positionSchema);