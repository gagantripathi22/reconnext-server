const express = require('express');
const router = express.Router();
const postController = require('../controller/post.controller');

router.post('/create', postController.createPost);
router.get('/get/posts/:page', postController.getPosts);
router.delete('/delete/post/:id', postController.deletePost);
router.patch('/update/post/:id', postController.updatePost);

module.exports = router;
