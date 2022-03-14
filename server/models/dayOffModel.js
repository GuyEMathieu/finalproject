var mongoose = require('mongoose');

//DayOff.js
var dayOffSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

},{
    timestamps: true
})

module.exports = mongoose.model('DayOff', dayOffSchema);