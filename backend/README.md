# Cartify Backend

## Overview

This is the backend API for the Cartify e-commerce application. It is built with Node.js, Express, and MySQL, and exposes REST endpoints for customers, products, and reports.

## Prerequisites

- Node.js 18+ installed
- MySQL / MariaDB server installed and running
- Optional: `nodemon` installed globally for development, or use the built-in `npm run dev` script

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create the MySQL database:

   ```sql
   CREATE DATABASE e_com_cartify;
   ```

3. Create the required tables. Example schema:

   ```sql
   USE e_com_cartify;

   CREATE TABLE customers (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(100) NOT NULL,
     email VARCHAR(100) UNIQUE NOT NULL,
     phone VARCHAR(20),
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   CREATE TABLE products (
     id INT AUTO_INCREMENT PRIMARY KEY,
     customer_id INT NOT NULL,
     product_name VARCHAR(255) NOT NULL,
     price DECIMAL(10, 2) NOT NULL,
     quantity INT DEFAULT 1,
     category VARCHAR(100),
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (customer_id) REFERENCES customers(id)
   );
   ```

4. Configure the database connection.

   The current connection settings are in `config/db.js`:

   - host: `localhost`
   - user: `root`
   - password: `` (empty)
   - database: `e_com_cartify`

   If your MySQL credentials differ, update `config/db.js` accordingly.

5. Start the server:

   ```bash
   npm run dev
   ```

   or for production:

   ```bash
   npm start
   ```

6. The API will run on `http://localhost:5000` by default.

## Available Endpoints

### Customers

- `GET /api/customers`
- `GET /api/customers/:id`
- `GET /api/customers/:id/products`
- `POST /api/customers`
- `PUT /api/customers/:id`
- `DELETE /api/customers/:id`

### Products

- `GET /api/products`
- `GET /api/products/category/:category`
- `GET /api/products/:id`
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`

### Reports

- `GET /api/reports/customer-product-summary`

## Notes

- The root route at `/` returns a simple status message.
- The report route currently returns joined customer and product rows where product price is greater than 100.
- `dotenv` is loaded in `server.js`, but the DB connection is currently configured directly in `config/db.js`.
- If you want environment-based configuration, update `config/db.js` to read from `process.env` and create a `.env` file.

