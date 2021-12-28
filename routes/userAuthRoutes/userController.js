const express = require('express');
const {check,  validationResult } = require('express-validator');
const router = express.Router();
const User = require('./User')
const config = require('config')
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
const { v4: uid } = require('uuid');

//@route        POST /api/users
//@desc         Register a user
//@access       Public
router.post('/',
    [
        check('username', "A valid username is required").not().isEmpty(),
        check('password', "A password of 6 or more character is required").isLength({min: 6})
    ],
    async (req, res) => {
        if (!validationResult(req).isEmpty()) {
            const errors = validationResult(req).array();
            let alerts = []
            for (let i = 0; i < errors.length; i++){
                alerts.push({severity: 'error', msg: errors[i].msg, _id: uid()})
            }
            return res.status(400).json({alerts: alerts})
        }
        try {
            const {username} = req.body

            let user = await User.findOne({ username });

            if (user) {
                return res.status(400).json({alerts: [{severity: 'error', msg: 'User already exists!', _id: uid()}]})
            }

            const dateCreated = new Date()
            user = new User({
                username,
                password: req.body.password,
                dateCreated,
            })

            const salt = await bcrypt.genSalt(10)

            user.password = await bcrypt.hash(user.password, salt)

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload, config.get('jwtSecret'), {
                expiresIn: 3600000
            }, (err, token) => {
                if (err) throw err
                res.json({token})

            })            
        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server Error')
        }
    }
)


module.exports = router;
