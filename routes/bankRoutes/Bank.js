//Bank.js

var mongoose = require('mongoose');

var termSchema = new mongoose.Schema({
    apr: { type: Number },
    termLength: {type: Number}
})

module.exports = mongoose.model('Term', termSchema);

var bankSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    terms:[termSchema],
    address: {
        street: { type: String },
        city: { type: String },
        zipcode: {type: String},
        state: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'states'
        },
        country: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'countries',
        }
    },
    lastModified: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Bank', bankSchema);