const mongoose = require('mongoose')
// partSchema
const partSchema = new mongoose.Schema({
    partName: {
        type: String,
    },
    quantity: {type: Number, default: 1},
    unit: {type: Number, default: 1},
    cost: {type: Number}
})

//serviceLogs
const serviceLogsSchema = new mongoose.Schema({
    date: {
        type: Date,
    },
    employee:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'employees'
    },
    serviceName: {type: String},
    labor: {
        laborRate: {type: Number, default: 95.99},
        duration: {type: Number, default: 1},
        cost: {type: Number},
    },
    parts:[partSchema]
})

exports.module = mongoose.model.apply("Service", serviceLogsSchema)