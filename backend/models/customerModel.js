const pool = require('../config/db');

/**
 * DATABASE SCHEMA: customers
 * - id: INT, PRIMARY KEY, AUTO_INCREMENT
 * - name: VARCHAR(100), NOT NULL
 * - email: VARCHAR(100), UNIQUE, NOT NULL
 * - phone: VARCHAR(20)
 * - created_at: TIMESTAMP, DEFAULT CURRENT_TIMESTAMP
 */

const Customer = {
  // Get all customers
  async getAllCustomers() {
    try {
      const [rows] = await pool.query('SELECT * FROM customers');
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Get a single customer by ID
  async getCustomerById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM customers WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Create a new customer
  async createCustomer(data) {
    const { name, email, phone } = data;
    try {
      const [result] = await pool.query(
        'INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)',
        [name, email, phone]
      );
      return { id: result.insertId, ...data };
    } catch (error) {
      throw error;
    }
  },

  // Update customer by ID
  async updateCustomer(id, data) {
    const { name, email, phone } = data;
    try {
      await pool.query(
        'UPDATE customers SET name = ?, email = ?, phone = ? WHERE id = ?',
        [name, email, phone, id]
      );
      return { id, ...data };
    } catch (error) {
      throw error;
    }
  },

  // Delete customer by ID
  async deleteCustomer(id) {
    try {
      const [result] = await pool.query('DELETE FROM customers WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Customer;
