const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const productController = require('../controllers/productController');

// GET /api/customers
router.get('/', customerController.getAllCustomers);

// GET /api/customers/:id
router.get('/:id', customerController.getCustomerById);

// GET /api/customers/:id/products
router.get('/:id/products', productController.getProductsByCustomer);

// POST /api/customers
router.post('/', customerController.createCustomer);

// PUT /api/customers/:id
router.put('/:id', customerController.updateCustomer);

// DELETE /api/customers/:id
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;
