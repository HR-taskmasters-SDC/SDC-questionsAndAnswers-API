const { Pool } = require('pg');
require('dotenv').config();

const connection = {
  host: 'localhost',
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: 'questions',
  port: 5432
};

const pool = new Pool(connection);
pool.connect()
  .then(() => {
    console.log('connect to database')
  })
  .catch((err) => console.error(err));

module.exports = pool;