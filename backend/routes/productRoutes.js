const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET /api/products
router.get('/', productController.getAllProducts);

// GET /api/products/category/:category
router.get('/category/:category', productController.getProductsByCategory);

// GET /api/products/:id
// Note: Placed after /category/:category to avoid route conflicts
router.get('/:id', productController.getProductById);

// POST /api/products
router.post('/', productController.createProduct);

// PUT /api/products/:id
router.put('/:id', productController.updateProduct);

// DELETE /api/products/:id
router.delete('/:id', productController.deleteProduct);

module.exports = router;
