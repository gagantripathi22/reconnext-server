const PostModel = require('../models/post.model.js');
const { Op } = require('sequelize');

const generateUrlFromTitle = (title) => {
  return title.replaceAll(' ', '-').toLowerCase();
};

const createPost = async (req, res) => {
  await new PostModel({
    title: req.body.title,
    body: req.body.body,
    url: generateUrlFromTitle(req.body.title),
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

const getPostUsingUrl = async (req, res) => {
  const url = req.params.url;
  console.log(url);
  await PostModel.findOne({ where: { url: url } })
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err.message));
};

const search = async (req, res) => {
  let lookupValue = req.body.searchTerm.toLowerCase();
  await PostModel.findAll({
    where: {
      [Op.or]: [
        {
          title: { [Op.iLike]: `%${lookupValue}%` },
        },
        {
          body: { [Op.iLike]: `%${lookupValue}%` },
        },
      ],
    },
  })
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err.messßage));
};

const searchNew = async (req, res) => {
  // const { query } = req.query;

  // try {
  //   const results = await PostModel.findAll({
  //     where: {
  //       [Op.or]: [
  //         { title: { [Op.iLike]: `%${query}%` } },
  //         { body: { [Op.iLike]: `%${query}%` } },
  //       ],
  //     },
  //   });

  //   res.status(200).send(results);
  // } catch (error) {
  //   console.error('Error searching for blogs:', error);
  //   res.status(500).json({ error: 'Internal server error' });
  // }
  res.status(200).send('new search test');
};

const createNewPost = async (req, res) => {
  new PostModel({
    title: req.body.title,
    body: req.body.body,
    url: generateUrlFromTitle(req.body.title),
  })
    .save()
    .then((data) => {
      res.status(200).send(`New Post : ${data}`);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports = {
  createPost,
  getPosts,
  deletePost,
  updatePost,
  getPostUsingUrl,
  search,
  searchNew,
  createNewPost,
};
