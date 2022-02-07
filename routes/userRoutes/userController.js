const express = require('express');
const router = express.Router();
const {check,  validationResult } = require('express-validator');
const { v4: uid } = require('uuid');
const User = require('./User');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const config = require("config")

// @route       GET api/users
// @desc        Get user list
// @access      private
router.get('/', async (req, res) => {

    try {
        const users = await User.find()
            .select('-lastModified').select('-__v')
            .sort({username: 1});
        
        res.json(users);

    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})

// @route       POST api/users/register
// @desc        register a user
// @access      private
router.post('/register', 
    [
        check("username", "username is required").not().isEmpty(),
        check("password", "a valid password of 6 or more characters").isLength({min: 7})
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            const alerts = [];
            for( let i = 0; i < errors.array().length; i++){
                alerts.push({severity: 'error', msg: errors.array()[i].msg, _id: uid()})
            }
            return res.status(400).json({errors: alerts})
        }
        try {

            let {username, password} = req.body;
            let newUser = await User.findOne({username: username});

            if(newUser){
                return res.status(400).json({alerts: [{severity: "error", msg: "User already exists", _id: uid()}]})
            }

            newUser = new User({username, password});

            const salt = await bcrypt.genSalt(10);

            newUser.password = await bcrypt.hash(newUser.password, salt);
            await newUser.save();

            const payload = {
                user: {
                    _id: newUser._id
                }
            }

            jwt.sign(payload, config.get('jwtSecret'), {
                expiresIn: 3600
            }, (err, token) => {
                if(err) throw err;
                res.json({token})
            })

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
)
// @route       POST api/users/login
// @desc        register a user
// @access      private
router.post('/login', 
    [
        check("username", "username is required").not().isEmpty(),
        check("password", "a valid password of 6 or more characters").isLength({min: 7})
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            const alerts = [];
            for( let i = 0; i < errors.array().length; i++){
                alerts.push({severity: 'error', msg: errors.array()[i].msg, _id: uid()})
            }
            return res.status(400).json({errors: alerts})
        }
        try {

            let {username, password} = req.body;
            let user = await User.findOne({username: username});

            if(!user){
                return res.status(400).json({alerts: [{severity: "error", msg: "Invalid username or password", _id: uid()}]})
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch){
                return res.status(400).json({alerts: [{severity: "error", msg: "Invalid username or password", _id: uid()}]})
            }

            const payload = {
                user: {
                    _id: user._id
                }
            }

            jwt.sign(payload, config.get('jwtSecret'), {
                expiresIn: 3600
            }, (err, token) => {
                if(err) throw err;
                res.json({token})
            })

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
)

module.exports = router;