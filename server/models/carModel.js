//Model.js

var mongoose = require('mongoose');

var modelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    manufacturer: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'manufacturers',
        required: true
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Model', modelSchema);