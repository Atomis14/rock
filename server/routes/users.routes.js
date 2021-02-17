const express = require('express');
const authMiddleware = require('../middleware/auth.middleware.js')
const usersController = require('../controllers/users.controller.js');

const router = express.Router();

router.get('/', authMiddleware.isAuthenticated, usersController.getAllUsers);

module.exports = router;