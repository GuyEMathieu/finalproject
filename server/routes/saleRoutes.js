const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware')

const {addSale, getAllSales, addMultipleSales} = require('../controllers/saleController')

// @route       GET api/sales
// @desc        Get list of all Sales objects
// @access      private
router.get('/', auth, getAllSales)


// @route       POST api/sales
// @desc        Add Sale objects
// @access      private
router.post('/performance/multiple', auth, addMultipleSales)

// @route       POST api/sales
// @desc        Add Sale objects
// @access      private
router.post('/', auth, addSale)

module.exports = router;
