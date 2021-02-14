const express = require('express');
const authMiddleware = require('../middleware/auth.middleware.js');
const postController = require('../controllers/post.controller.js');

const router = express.Router();

router.get('/', authMiddleware.isAuthenticated, postController.getAllPosts);
router.post('/', authMiddleware.isAuthenticated, postController.addPost)

module.exports = router;