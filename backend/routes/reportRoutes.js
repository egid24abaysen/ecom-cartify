const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// GET /api/reports/customer-product-summary
router.get('/customer-product-summary', reportController.getCustomerProductSummary);

module.exports = router;
