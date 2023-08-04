const { Sequelize } = require('sequelize-cockroachdb');
require('dotenv').config();

const db = new Sequelize({
  dialect: process.env.DB_DIALECT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: 'posts',
  logging: false,
  dialectOptions: {
    ssl: {},
  },
});

module.exports = db;
