const express = require('express');
const path = require('path');
const router = require('./router.js');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../../FEC-HRLAX48/dist')));

app.use('/api', router);

app.listen(port, (err) => {
  err ? console.error(err) : console.log(`Listening on port ${port}`)
});