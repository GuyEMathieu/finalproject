//State.js

var mongoose = require('mongoose');

var stateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true
    },
    country: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'countries',
        required: true
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('State', stateSchema);