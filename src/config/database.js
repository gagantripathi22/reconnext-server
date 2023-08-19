const { Sequelize } = require('sequelize-cockroachdb');
require('dotenv').config();
// const AdminModel = require('../models/admin.model.js');
// const PostModel = require('../models/post.model.js');

const db = new Sequelize({
  dialect: 'postgres' || 'mysql',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: 'database',
  logging: false,
  dialectOptions: {
    ssl: {},
  },
});

db.sync({});

module.exports = db;
