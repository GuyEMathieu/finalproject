const express = require('express');
const colors = require('colors')
const app = express();

// const { connect } = require("mongoose");
// const connectDB = require("./config/db");

// // Connect Database
// connectDB();

// // //Init Middleware
// app.use(express.json({ extended: false, limit: '50mb' }));

// app.get('/', (req, res) => ({ msg: 'Welcome to  API' }));

// // default routs
// app.use('/api/defaults', require('./routes/defaultRoutes/defaultController'))

// // User and Auth routes
// app.use('/api/users', require('./routes/userAuthRoutes/userController'))
// app.use('/api/auth', require('./routes/userAuthRoutes/authController'))

// // Address Routes
// app.use('/api/states', require('./routes/state_countryRoutes/stateController'))
// app.use('/api/countries', require('./routes/state_countryRoutes/countryController'))
// app.use('/api/zipcodes', require('./routes/state_countryRoutes/zipcodeController'))

// // Bank Routes
// app.use('/api/banks', require('./routes/bankRoutes/bankController'))

// // Manufacturers Routes
// app.use('/api/basevehicles', require('./routes/vehicleRoutes/baseVehicleController'))

// // Employees Routes
// app.use('/api/employees', require('./routes/employeeRoutes/employeeController'))

// // Genders Routes
// app.use('/api/genders', require('./routes/genderRoutes/genderController'))

// // Departments and Positions Routes
// app.use('/api/dept_positions', require('./routes/dept_positionRoutes/dept_position_controller'))

// // Inventory Routes
// app.use('/api/inventory', require('./routes/inventoryRoutes/inventoryController'))

// // Customer Routes
// app.use('/api/customers', require('./routes/customer_routes/customerController'))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`.cyan.underline.bold))