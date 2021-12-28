const express = require('express');
const {check,  validationResult } = require('express-validator');
const router = express.Router();
const User = require('./User')
const auth = require('./auth')
const config = require('config')
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
const { v4: uid } = require('uuid');

//@route        GET /api/auth
//@desc         Get logged in  user
//@access       Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select('-password')
            .select('-__v')
            .select('-dateCreated')
            .select('-lastModified')
        res.json({user})
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

//@route        POST /api/auth
//@desc         Auth user and get token
//@access       Public
router.post('/',
    [
        check('username', "A valid email is required").not().isEmpty(),
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
            const { username, password } = req.body;

            let user = await User.findOne({ username });

            if (!user) {
                return res.status(400).json({alerts: [{severity: 'error', msg: 'Invalid Credential', _id: uid()}]})
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({alerts: [{severity: 'error', msg: 'Invalid Credential', _id: uid()}]})
            }

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
