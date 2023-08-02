const express = require('express');
const app = express();
const { Posts } = require('./models/post')
const port = 8080;
const host = '127.0.0.1';

var bodyParser = require('body-parser')

app.use(bodyParser.json())

const Sequelize = require('sequelize-cockroachdb')

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
})

app.get('/post', (req, res) => {
  Posts.sync({
    force: false,
  })
  .then(function() {
    return {
      hey: "jod"
    };
  })
  .then(function(posts) {
    res.send(posts)
  })
})


app.listen(port, host, () => {
  console.log(`server started at ${host} port ${port}`)
})

module.exports = db;