const pool = require('../config/db');

const Report = {
  /**
   * Complex JOIN: Get customer details with product categories and pricing
   * for products with price > 100, ordered by price descending.
   */
  async getCustomerProductSummary() {
    try {
      const query = `
        SELECT c.name, p.product_name, p.category, p.price
        FROM customers c
        JOIN products p ON c.id = p.customer_id
        WHERE p.price > 100
        ORDER BY p.price DESC
      `;
      const [rows] = await pool.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Report;
