const pool = require('../config/db');

const Product = {
  // Get all products
  async getAllProducts() {
    try {
      const [rows] = await pool.query('SELECT * FROM products');
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Get products by category with customer join
  async getProductsByCategory(category) {
    try {
      const query = `
        SELECT products.*, customers.name AS customer_name, customers.email AS customer_email
        FROM products 
        JOIN customers ON products.customer_id = customers.id 
        WHERE products.category = ?
      `;
      const [rows] = await pool.query(query, [category]);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Get all products for a specific customer with customer details via JOIN
  async getProductsByCustomer(customerId) {
    try {
      const query = `
        SELECT products.*, customers.name AS customer_name 
        FROM products 
        JOIN customers ON products.customer_id = customers.id 
        WHERE products.customer_id = ?
      `;
      const [rows] = await pool.query(query, [customerId]);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Get a single product by ID with customer details
  async getProductById(id) {
    try {
      const query = `
        SELECT products.*, customers.name AS customer_name 
        FROM products 
        JOIN customers ON products.customer_id = customers.id 
        WHERE products.id = ?
      `;
      const [rows] = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Create a new product
  async createProduct(data) {
    const { customer_id, product_name, price, quantity, category } = data;
    try {
      const [result] = await pool.query(
        'INSERT INTO products (customer_id, product_name, price, quantity, category) VALUES (?, ?, ?, ?, ?)',
        [customer_id, product_name, price, quantity || 1, category]
      );
      return { id: result.insertId, ...data };
    } catch (error) {
      throw error;
    }
  },

  // Update product by ID
  async updateProduct(id, data) {
    const { product_name, price, quantity, category } = data;
    try {
      await pool.query(
        'UPDATE products SET product_name = ?, price = ?, quantity = ?, category = ? WHERE id = ?',
        [product_name, price, quantity, category, id]
      );
      return { id, ...data };
    } catch (error) {
      throw error;
    }
  },

  // Delete product by ID
  async deleteProduct(id) {
    try {
      const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Product;
