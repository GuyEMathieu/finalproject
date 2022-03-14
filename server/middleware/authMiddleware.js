const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { v4: uid } = require('uuid');


module.exports = async function(req, res, next) {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            // Get token
            token = req.headers.authorization.split(' ')[1];

            // Verify Token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from token
            req.user = await User.findById(decoded.user.id)
                .select('-password');
            console.log("user validated")
            next();
        } catch(err){
            console.log(err.message)
            res.status(401).json({message: [{severity: 'error', msg: 'Unauthorized user', _id: uid()}]})
        }
    }

    if(!token){
        res.status(401).json({message: [{severity: 'error', msg: 'Invalid token', _id: uid()}]})
    }
}
