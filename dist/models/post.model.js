const Sequelize = require('sequelize-cockroachdb');
const db = require('../config/database');
const Posts = db.define('posts', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING
  },
  body: {
    type: Sequelize.TEXT
  },
  status: {
    type: Sequelize.STRING
  },
  url: {
    type: Sequelize.STRING
  }
});
db.sync({
  force: true
});
module.exports = Posts;