
const jwt = require('jsonwebtoken')
const config = require('config')
const { v4: uid } = require('uuid');

module.exports = function (req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    // check if not token
    if (!token) {
        return res.status(401).json({ alerts: [{ severity: 'error', msg: 'Unauthorized user. Access Denied', _id: uid() }] });
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ alerts: [{ severity: 'error', msg: 'Invalid Token', _id: uid() }] });
    }
}
