const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Google authentication route
router.get('/google', authController.googleAuth);

// Google callback route
router.get('/google/callback', authController.googleAuthCallback);

// Logout route
router.get('/logout', authController.logout);

module.exports = router;