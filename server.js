const express = require('express');
const path = require('path');
const router = require('./src/router.js');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../dist')));

app.use('/api/v1', router);

app.listen(port, (err) => {
  err ? console.error(err) : console.log(`Listening on port ${port}`)
});