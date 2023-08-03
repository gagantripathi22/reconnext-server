const { Sequelize } = require('sequelize-cockroachdb');
const db = new Sequelize({
  dialect: "postgres",
  username: 'gagan',
  password: 'Bcfbmhmq-WwboomNrFQuaQ',
  host: 'reconnext-database-295.j77.cockroachlabs.cloud',
  port: 26257,
  database: 'posts',
  logging: false,
  dialectOptions: {
    ssl: {
      
    },
  }
});

module.exports = db; 