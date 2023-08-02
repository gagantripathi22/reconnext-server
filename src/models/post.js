const Sequelize = require('sequelize-cockroachdb')
const db = require('../index')

const Posts = db.define("posts", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
  },
  body: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.STRING,
  },
  url: {
    type: Sequelize.STRING,
  },
});

module.exports = Posts;