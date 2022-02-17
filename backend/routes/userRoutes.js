const express = require('express');
const router = express.Router();
const {
    loginUser, registerUser,
    getAll, getLoggedInUser
} = require('../controllers/userController')
const auth = require('../authMiddleware/auth');


// @desc    Get current user
// @route   /api/users
// @access  private
router.get('/', auth, getLoggedInUser)

// @desc    get list of users
// @route   /api/users/all
// @access  private
router.get('/all', auth, getAll)

// @desc    login a new user
// @route   /api/users/login
// @access  public
router.post('/login', loginUser)

// @desc    Register a new user
// @route   /api/users/register
// @access  public
router.post('/register', registerUser)


module.exports = router;