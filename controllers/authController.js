// controllers/authController.js
const bcrypt = require('bcrypt');
const authModel = require('../models/authModel');
const { findUserByEmail } = require('../models/authModel');
const crypto = require('crypto');



// Register Controller
const register = (req, res) => {
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Hash the password before saving
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: 'Error hashing password' });
    }

    // Call model to register user
    authModel.registerUser(name, email, hashedPassword, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Registration failed', error: err });
      }

      res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    });
  });
};

const jwt = require('jsonwebtoken'); // Import jsonwebtoken

const login = (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // Find user by email
  authModel.findUserByEmail(email, (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Generate a JWT
      const token = jwt.sign(
        { id: user.id, email: user.email }, // Payload
        'your-secret-key', // Replace with a secure secret key
        { expiresIn: '1h' } // Token expiration time
      );

      // Send the token and user details in the response
      res.status(200).json({
        message: 'Login successful',
        token, // Include the token
        user: { id: user.id, name: user.name, email: user.email },
      });
    });
  });
};

const forgotPassword = (req, res) => {
    const { email } = req.body;
  
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
  
    findUserByEmail(email, (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err });
      }
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Generate a reset token
      const resetToken = crypto.randomBytes(20).toString('hex');
      const tokenExpiration = Date.now() + 15 * 60 * 1000; // Token valid for 15 minutes
  
      // Simulate saving token and expiration (normally, you'd save this to the DB)
      // Example: authModel.saveResetToken(user.id, hashedResetToken, tokenExpiration);
  
      // Send reset token via email (pseudo-code)
      // emailService.sendResetEmail(user.email, resetToken);
  
      res.status(200).json({
        message: 'Password reset instructions sent to your email',
      });
    });
  };


  const logout = (req, res) => {
    // Extract the token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
  
    if (!token) {
      return res.status(400).json({ message: 'Token is required to log out' });
    }
  
    // Simulate token invalidation (e.g., add to a blacklist or handle client-side removal)
    // In a real-world scenario, you might store the token in a blacklist or invalidate it in some way.
    res.status(200).json({ message: 'Logout successful. Token invalidated.' });
  };

  const resetPassword = (req, res) => {
    const { resetToken, newPassword } = req.body;
  
    // Validate input
    if (!resetToken || !newPassword) {
      return res.status(400).json({ message: 'Reset token and new password are required' });
    }
  
    // Find user by reset token
    authModel.findUserByResetToken(resetToken, (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err });
      }
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired reset token' });
      }
  
      // Check if the token has expired
      if (Date.now() > user.reset_token_expiration) {
        return res.status(400).json({ message: 'Reset token has expired' });
      }
  
      // Hash the new password
      bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({ message: 'Error hashing password', error: err });
        }
  
        // Update the user's password in the database
        authModel.updateUserPassword(user.id, hashedPassword, (err) => {
          if (err) {
            return res.status(500).json({ message: 'Failed to update password', error: err });
          }
  
          // Clear the reset token and expiration
          authModel.clearResetToken(user.id, (err) => {
            if (err) {
              return res.status(500).json({ message: 'Failed to clear reset token', error: err });
            }
  
            res.status(200).json({ message: 'Password reset successful' });
          });
        });
      });
    });
  };

module.exports = {
  register,
  login,
  forgotPassword,
  logout, // Export the logout function
  resetPassword,
};;


