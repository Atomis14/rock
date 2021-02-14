const express = require('express');
const authMiddleware = require('../middleware/auth.middleware.js');
const postController = require('../controllers/post.controller.js');

const router = express.Router();

router.get('/', authMiddleware.isAuthenticated, postController.getAllPosts);
router.post('/', authMiddleware.isAuthenticated, postController.addPost);
router.delete('/:id', authMiddleware.isAuthenticated, postController.deleteOnePost);

module.exports = router;