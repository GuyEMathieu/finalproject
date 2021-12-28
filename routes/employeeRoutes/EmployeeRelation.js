var mongoose = require('mongoose');

var EmployeeRelationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    lastModified: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('EmployeeRelation', EmployeeRelationSchema);