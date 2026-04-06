const Product = require('../models/productModel');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching all products:', error);
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.getProductsByCategory(category);
    res.status(200).json(products);
  } catch (error) {
    console.error(`Error fetching products for category ${req.params.category}:`, error);
    res.status(500).json({ message: 'Failed to fetch products by category', error: error.message });
  }
};

exports.getProductsByCustomer = async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const products = await Product.getProductsByCustomer(customerId);
    res.status(200).json(products);
  } catch (error) {
    console.error(`Error fetching products for customer ${req.params.customerId}:`, error);
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.getProductById(productId);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product by id:', error);
    res.status(500).json({ message: 'Failed to fetch product', error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { customer_id, product_name, price, quantity, category } = req.body;
    
    if (!customer_id || !product_name || !price) {
      return res.status(400).json({ message: 'customer_id, product_name, and price are required fields' });
    }
    
    const newProduct = await Product.createProduct({ customer_id, product_name, price, quantity, category });
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Failed to create product', error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { product_name, price, quantity, category } = req.body;
    
    const updatedProduct = await Product.updateProduct(productId, { product_name, price, quantity, category });
    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Failed to update product', error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const success = await Product.deleteProduct(productId);
    
    if (!success) {
      return res.status(404).json({ message: 'Product not found or already deleted' });
    }
    
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Failed to delete product', error: error.message });
  }
};
