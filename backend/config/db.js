const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'e_com_cartify',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Check the connection using try catch finally
(async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log('Successfully connected to the database: e_com_cartify');
  } catch (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    } else if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.');
    } else if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.');
    } else {
      console.error('Database connection error:', err);
    }
  } finally {
    if (connection) connection.release();
  }
})();

module.exports = pool.promise();

