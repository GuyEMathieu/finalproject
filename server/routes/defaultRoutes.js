const express = require('express');
const router = express.Router();
const { getAll } = require('../controllers/defaultController')
const auth = require('../middleware/authMiddleware');

// @desc    login a new user
// @route   /api/users/login
// @access  public
router.get('/',  getAll)

module.exports = router;