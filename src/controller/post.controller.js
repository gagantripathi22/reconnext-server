const PostModel = require('../models/post.model.js');

const createPost = async (req, res) => {
  var newPost = new PostModel({
    title: req.body.title,
    body: req.body.body,
    url: req.body.title,
  })
    .save()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const getPosts = async (req, res) => {
  const offset = req.params.page;
  await PostModel.findAll({
    limit: 10,
    offset: offset,
    order: [['updatedAt', 'DESC']],
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const deletePost = async (req, res) => {
  const postId = req.params.id;
  await PostModel.destroy({ where: { id: postId } })
    .then((data) => res.status(200).send(`Post Deleted : ${data}`))
    .catch((err) => res.status(500).send(err.message));
};

const updatePost = async (req, res) => {
  const postId = req.params.id;
  await PostModel.update({ ...req.body }, { where: { id: postId } })
    .then((data) => res.status(200).send(`Post Updated : ${data}`))
    .catch((err) => res.status(500).send(err.message));
};

module.exports = {
  createPost,
  getPosts,
  deletePost,
  updatePost,
};
