const express = require('express');
const colors = require('colors')
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000
const app = express();
const connectDB = require('./config/db')

// Connect to DB
connectDB();
app.use(express.json())

app.use(express.urlencoded({extended: false}))



app.use('/api/users', require('./routes/userRoutes'))



app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`))