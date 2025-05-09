// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // import controller
const { forgotPassword } = require('../controllers/authController'); // import forgot password controller


// @route   POST /api/register
// @desc    Register a new user
router.post('/register', authController.register);

// @route   POST /api/login
// @desc    Login user
router.post('/login', authController.login);

// handle forgot password request 
router.post('/forgot-password', authController.forgotPassword);


router.post('/logout', authController.logout);

// @route   POST /api/reset-password
// @desc    Reset user password
router.post('/reset-password', authController.resetPassword);


module.exports = router;
