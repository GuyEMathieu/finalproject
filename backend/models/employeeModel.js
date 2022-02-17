// Employee.js

const mongoose = require('mongoose');

//#region Employment Info
const employmentInfoSchema = new mongoose.Schema({
    employeeNumber: {
        type: Number,
        required: true,
        unique: true
    },
    startDate: {
        type: Date,
        default: ''
    },
    team: {
        type: String,
        default: ''
    },
    position: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'positions',
        default: ''
    },
    department: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'departments',
        default: ''
    },
    salary: {
        type: Number,
        default: 35000
    }
})
//#endregion

//#region DRIVER LICENSE
const driverLicenseSchema = new mongoose.Schema({
    dlState: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'states',
        default: ''
    },
    dlNumber:{
        type: String,
        default: ''
    }
},{
    timestamps: true
})
//#endregion

//#region ADDRESS
const addressSchema = new mongoose.Schema({
    street:{
        type: String,
        default: ''
    },
    aptNum:{
        type: String
    },
    city:{
        type: String,
        default: ''
    },
    
    zipcode:{
        type: String,
        default: ''
    },
    state: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'states',
        default: ''
    },
    country: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'countries',
        default: ''
    },
    
},{
    timestamps: true
})
//#endregion

//#region Employee Schema
const employeeSchema = new mongoose.Schema({
    user:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users',
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
    },
    dateOfBirth: {
        type: Date,
        required: true,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    ssn: {
        type: String,
        unique: true
    },
    team: {
        type: String,
        default: ''
    },
    avatar: {
        type: String,
        default: ''
    },
    gender: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'genders'
    },
    driverLicense: driverLicenseSchema,
    address: addressSchema,
    employmentInfo: employmentInfoSchema,

}, {
    timestamps: true
})

//#endregion

module.exports = mongoose.model('Employee', employeeSchema)
