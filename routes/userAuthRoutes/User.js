// User.js
const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
    },

    lastModified: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', UserSchema)
