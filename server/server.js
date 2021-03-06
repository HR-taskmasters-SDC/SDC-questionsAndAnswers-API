const express = require('express');
const path = require('path');
const router = require('./router.js');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use('/api', router);

app.listen(port, (err) => {
  err ? console.error(err) : console.log(`Listening on port ${port}`)
});