const express = require('express');
const router = express.Router();
const postController = require('../controller/post.controller');
const basicAuthentication = require('../middleware/basicAuth');
const verifyToken = require('../middleware/verifyToken');

router.post(
  '/create',
  basicAuthentication,
  verifyToken.verifyToken,
  postController.createPost
);
router.get('/get/posts/:page', basicAuthentication, postController.getPosts);
router.get(
  '/get/post/:url',
  basicAuthentication,
  postController.getPostUsingUrl
);
router.delete(
  '/delete/post/:id',
  basicAuthentication,
  verifyToken.verifyToken,
  postController.deletePost
);
router.patch(
  '/update/post/:id',
  basicAuthentication,
  verifyToken.verifyToken,
  postController.updatePost
);

module.exports = router;
