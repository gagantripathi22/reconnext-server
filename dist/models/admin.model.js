const {
  Sequelize
} = require('sequelize-cockroachdb');
const db = require('../config/database');
const Admins = db.define('admins', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
});
module.exports = Admins;