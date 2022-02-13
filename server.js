const express = require('express');
const colors = require('colors')
const app = express();

const { connect } = require("mongoose");
const connectDB = require("./config/db");

// Connect Database
connectDB();

// //Init Middleware
app.use(express.json({ extended: false, limit: '50mb' }));

app.get('/', (req, res) => ({ msg: 'Welcome to  API' }));


// Default Routes
app.use('/api/defaults', require('./routes/defaultRoutes/defaultController'))

// Genders Routes
app.use('/api/genders', require('./routes/genderRoutes/genderController'))

// Country Routes
app.use('/api/countries', require('./routes/countryRoutes/countryController'))

// Zipcode Routes
app.use('/api/zipcodes', require('./routes/zipcodeRoutes/zipcodeController'))

// States Routes
app.use('/api/states', require('./routes/stateRoutes/stateController'))

// Bank Routes
app.use('/api/banks', require('./routes/bankRoutes/bankController'))

// DayOff Routes
app.use('/api/daysoff', require('./routes/daysoffRoutes/dayoffController'))

// Department Routes
app.use('/api/departments', require('./routes/departmentRoutes/departmentController'))

// Position Routes
app.use('/api/positions', require('./routes/positionRoutes/positionController'))

// Manufacturer Routes
app.use('/api/manufacturers', require('./routes/manufacturerRoutes/manufacturerController'))

// Model Routes
app.use('/api/models', require('./routes/modelRoutes/modelController'))

// Model Routes
app.use('/api/inventoryVehicles', require('./routes/inventoryRoutes/vehicles/inventoryVehicleController'))

// Customer Routes
app.use('/api/customers', require('./routes/customerRoutes/customerController'))

// Customer Sales
app.use('/api/sales', require('./routes/saleRoutes/saleController'))

// Users
app.use('/api/users', require('./routes/userRoutes/userController'))

// Employees
app.use('/api/employees', require('./routes/employeeRoutes/employeeController'))

// Services
app.use('/api/services', require('./routes/serviceRoutes/serviceController'))


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`.cyan.underline.bold))