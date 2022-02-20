const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

const {getAllServices, addMultipleServices} = require('../controllers/serviceController')



// @route       POST api/service
// @desc        GET ALL SERVICEs
// @access      private
router.get('/', auth, getAllServices)

// @route       POST api/service/multiple
// @desc        GET ALL SERVICEs
// @access      private
router.post('/multiple', auth, addMultipleServices)


module.exports = router;
