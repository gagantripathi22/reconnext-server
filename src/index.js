const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./config/database');
db.authenticate()
  .then(() => {
    console.log('Database Connceted !');
  })
  .catch((err) => {
    console.log('Error: ' + err);
  });

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors('*'));

app.use('/', require('./routes/post.route'));
app.use('/', require('./routes/admin.route'));

const PORT = process.env.PORT || 8080;
db.sync()
  .then(() => {
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => console.log('Error: ' + err));
