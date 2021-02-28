const express = require('express');
const authMiddleware = require('../middleware/auth.middleware.js');
const messagesController = require('../controllers/messages.controller.js');

const router = express.Router();

router.get('/latest', authMiddleware.isAuthenticated, messagesController.getLatestMessages);
router.get('/received', authMiddleware.isAuthenticated, messagesController.getReceivedMessages);
router.get('/sent', authMiddleware.isAuthenticated, messagesController.getSentMessages);
router.post('/', authMiddleware.isAuthenticated, messagesController.sendMessage);
router.delete('/:id', authMiddleware.isAuthenticated, messagesController.deleteMessage);

module.exports = router;