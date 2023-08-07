const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/database');

db.authenticate()
  .then(() => {
    console.log('Database Connected !');
  })
  .catch((err) => {
    console.log('Error: ' + err);
  });

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json());
app.use(cors());

app.use('/', require('./routes/post.route'));
app.use('/', require('./routes/admin.route'));

const PORT = 8080;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
