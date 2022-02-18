const User = require('../models/userModel');
const Employee = require('../models/employeeModel')
const { v4: uid } = require('uuid');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();


// @desc    Register a new user
// @route   /api/users
// @access  public
const registerUser = async (req, res) => {
    try {
        let {username, password} = req.body;
        if(!username || !password){
            return res.status(400).json({message: "A valid username and password is required"})
        }

        let newUser = await User.findOne({username: username});

        if(newUser){
            return res.status(400).json({message: [{severity: 'error', msg: "User already exists", _id: uid()}]})
        }

        const salt = await bcrypt.genSalt(10);

        const hashPassword = await bcrypt.hash(password, salt);
        
        newUser = await User.create({
            username, 
            password: hashPassword
        });

        if(!newUser){
            return res.status(400).json({message: [{severity: 'error', msg: 'Invalid user Data', _id: uid()}]})
        }

        const payload = {
            user: {
                id: newUser._id,
                isAdmin: newUser.isAdmin
            }
        }
    

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 3600
        }, (err, token) => {
            if(err) throw err;
            res.json({token})
        })
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

const loginUser = async (req, res) => {
    try {
            let {username, password} = req.body;
            let user = await User.findOne({username: username});

            if(user && (await bcrypt.compare(password, user.password))){
                const profile = await Employee.findOne({user: user._id})
                    .select('-createdAt').select('-updatedAt').select('-__v')
                const payload = {
                    user: {
                        id: user._id,
                        isAdmin: user.isAdmin
                    }
                }

                jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: 3600
                }, (err, token) => {
                    if(err) throw err;
                    res.json({token, profile})
                })
            }
            else {
                return res.status(400).json({message: [{severity: "error", msg: "Invalid username or password", _id: uid()}]})
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
}

const getLoggedInUser = async (req, res) => {
    try {
        let user = await User.findById(req.user.id)
            .select('-password')
            .select('-createdAt')
            .select('-updatedAt')
            .select('-__v')
        
        const employee = await Employee.findOne({user: user._id})
            .select('-createdAt')
            .select('-updatedAt')
            .select('-__v')
        
        user.profile = employee

        let data = {
            isAdmin: user.isAdmin,
            _id: user._id,
            username: user.username,
            profile: employee
        }

        res.json(data)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

const getAll = async (req, res) => {
    try {
        const users = await User.find()
            .select('-lastModified').select('-__v')
            .sort({username: 1});
        
        res.json(users);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}



module.exports ={
    loginUser, registerUser,
    getAll, getLoggedInUser
}