// utils/db.js
const mysql = require('mysql');

// Change this to your actual MySQL login info
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',             // your MySQL username
  password: '',             // your MySQL password
  database: 'auth_db'       // name of your database
});

db.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection failed:', err.message);
    process.exit(1); // stop app if DB doesn't connect
  }
  console.log('✅ Connected to MySQL database');
});

module.exports = db;
