// models/authModel.js
const db = require('../utils/db'); // Import the MySQL connection

// Register new user
const registerUser = (name, email, password, callback) => {
  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(sql, [name, email, password], (err, results) => {
    if (err) {
      return callback(err, null);  // If error, return the error
    }
    return callback(null, results);  // Success, return the result
  });
};

// Find user by email (for login)
const findUserByEmail = (email, callback) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results[0]);  // Return the first result (user)
  });
};


// Save reset token and expiration for a user
const saveResetToken = (userId, resetToken, tokenExpiration, callback) => {
  const sql = 'UPDATE users SET reset_token = ?, reset_token_expiration = ? WHERE id = ?';
  db.query(sql, [resetToken, tokenExpiration, userId], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
};

// Find user by reset token
const findUserByResetToken = (resetToken, callback) => {
  const sql = 'SELECT * FROM users WHERE reset_token = ?';
  db.query(sql, [resetToken], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results[0]); // Return the first result (user)
  });
};

// Update user's password
const updateUserPassword = (userId, hashedPassword, callback) => {
  const sql = 'UPDATE users SET password = ? WHERE id = ?';
  db.query(sql, [hashedPassword, userId], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
};

// Clear reset token and expiration
const clearResetToken = (userId, callback) => {
  const sql = 'UPDATE users SET reset_token = NULL, reset_token_expiration = NULL WHERE id = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
};


module.exports = {
  registerUser,
  findUserByEmail,
  saveResetToken, // Export the new method
  findUserByResetToken,
  updateUserPassword,
  clearResetToken,
};
