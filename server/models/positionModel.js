var mongoose = require('mongoose');

//Position.js
var positionSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    department: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'departments',
        required: true
    }

},{
    timestamps: true
})

module.exports = mongoose.model('Position', positionSchema);