const pool = require('./db.js');

const getQuestionsById = (req, res) => {
  //const id = parseInt(req.params.product_id);
  const id = parseInt(req.query.product_id);
  let page = req.query.page || 1;
  let count = req.query.count || 5;
  const limit = page * count;
  const query = `SELECT * FROM questions WHERE product_id=${id} AND reported=false ORDER BY helpful DESC LIMIT ${limit};`;
  pool.query(query, (err, results) => {
    if(err) {
      console.error(err);
      res.send('failure');
    } else {
      res.status(200).json(results.rows);
    }
  });
};

const addQuestion = (req, res) => {
  // const product_id = parseInt(req.body.product_id);
  // const body = req.body.body;
  // const name = req.body.name;
  // const email = req.body.email;
  const {product_id, body, name, email } = req.body;
  const query = `INSERT INTO questions (product_id, body, asker_name, asker_email)
  VALUES (${product_id}, ${body}, ${name}, ${email});`;
  pool.query(query, (err, results) => {
    if(err) {
      console.error(err);
      res.send('failure to add question')
    } else {
      res.status(201).send('success add question');
    }
  });
};

const markQuestionHelpful = (req, res) => {
  const id = req.params.question_id;
  const query = `UPDATE questions SET helpful = helpful + 1 WHERE question_id = ${id}`;
  pool.query(query, (err, results) => {
    if(err) {
      console.error(err);
      res.send('failure to mark helpfulness')
    } else {
      res.status(204);
    }
  });
};

const reportQuestion = (req, res) => {
  const id = req.params.question_id;
  const query = `UPDATE questions SET reported = true WHERE question_id = ${id}`;
  pool.query(query, (err, results) => {
    if(err) {
      console.error(err);
      res.send('failure to report a question')
    } else {
      res.status(204);
    }
  });
};

const getAnswersById = (req, res) => {
  const id = req.params.question_id;
  const query = `SELECT * FROM answers WHERE question_id=${id} AND reported=false ORDER BY helpful DESC;`;
  pool.query(query, (err, results) => {
    if(err) console.error(err);
    res.status(200).json(results.rows);
  });
};



const getPhotos = (req, res) => {
}



module.exports = {
  getQuestionsById,
  getAnswersById,
  addQuestion,
  markQuestionHelpful,
  reportQuestion,
  getPhotos
};