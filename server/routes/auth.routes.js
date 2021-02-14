const express = require('express');
const authMiddleware = require('../middleware/auth.middleware.js')
const authController = require('../controllers/auth.controller.js');

const router = express.Router();

router.post('/login', authController.login);
router.get('/', authMiddleware.isAuthenticated, authController.authenticate);
router.post('/register', authController.register);
router.post('/logout', authController.logout);

module.exports = router;