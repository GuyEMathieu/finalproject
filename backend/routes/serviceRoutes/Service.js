const mongoose = require('mongoose')
// partSchema


//serviceLogs
const serviceSchema = new mongoose.Schema({
    date: {
        type: Date,
    },
    employee:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'employees'
    },
    vehicle: {type: String},
    serviceName: {type: String},
    serviceValue: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("Service", serviceSchema)