const jwt = require("jsonwebtoken");
const config = require("config");
const { v4: uid } = require('uuid');

module.exports = function(req, res, next) {
    // GEt Token from header
    const token = req.header('x-auth-token');

    // Check if not token
    if(!token){
        return res.status(401).json({errors: [{severity: 'error', msg: "Unknown user, authorization denied", _id: uid()}]})
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;

        next();
    }catch(err){
        res.status(401).json({errors: [{severity: 'error', msg: 'Invalid Token, Access Denied', _id: uid()}]})
    }
}