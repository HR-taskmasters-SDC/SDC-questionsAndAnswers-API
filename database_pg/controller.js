const pool = require('./db.js');
const queries = require('./queries.js');

const getQuestionsById = (req, res) => {
  //const id = parseInt(req.params.product_id);
  const id = parseInt(req.query.product_id);
  let page = req.query.page || 1;
  let count = req.query.count || 5;
  const limit = page * count;
  const values = [id, limit];
  pool
    .query(queries.getQuestion, values)
    .then((results) => {
      const questions = {
        "product_id": id,
        "results": results.rows
      };
      res.status(200).json(questions);
    })
    .catch((err) => res.send(err));
};

const getQuestion = (req, res) => {
  const id = parseInt(req.query.product_id);
  const query = `SELECT ARRAY_AGG(question_id, body, date_timestamp) FROM questions WHERE product_id=$1 LIMIT 2;`;
  pool
    .query(query, [id])
    .then((results) => {
      res.status(200).json(results);
      console.log(results);
    })
    .catch((err) => console.error(err))
};

const addQuestion = (req, res) => {
  const {product_id, body, name, email } = req.body;
  const values = [product_id, body, name, email];
  console.log(req.body);
  //const query = `INSERT INTO questions (product_id, body, asker_name, asker_email) VALUES (${product_id}, '${body}', '${name}', '${email}');`;
  // pool.query(query, (err, results) => {
  //   if(err) {
  //     console.error(err);
  //     res.send('failure to add question')
  //   } else {
  //     res.status(201).send('success add question');
  //   }
  // });
  pool
    .query(queries.addQuestion, values)
    .then((results) => {
      res.status(201).send('success add question');
    })
    .catch((err) => {
      res.send(err);
    })
};

const markQuestionHelpful = (req, res) => {
  const { question_id } = req.params;
  pool
  .query(queries.markQuestionHelpful, [question_id])
  .then((results) => {
    res.status(204);
  })
  .catch((err) => {
    res.send(err);
    console.error(err);
  });
  //const query = `UPDATE questions SET helpful = helpful + 1 WHERE question_id = ${id}`;
  // pool.query(query, (err, results) => {
  //   if(err) {
  //     console.error(err);
  //     res.send('failure to mark helpfulness')
  //   } else {
  //     res.status(204);
  //   }
  // });
};

const reportQuestion = (req, res) => {
  const id = req.params.question_id;
  pool.query(queries.reportQuestion, [id], (err, results) => {
    if(err) {
      console.error(err);
      res.send('failure to report a question')
    } else {
      res.status(204);
    }
  });
  // const query = `UPDATE questions SET reported = true WHERE question_id = $1`;
  // pool
  //   .query(query, [id])
  //   .then((results) => res.status(204))
  //   .catch((err) => console.error(err));
};

const getAnswersById = (req, res) => {
  const id = req.params.question_id;
  const { page, count } = req.query;
  console.log(req.params);
  console.log(req.query);
  // const query = `SELECT * FROM answers WHERE question_id=${id} AND reported=false ORDER BY helpful DESC;`;
  // pool.query(query, (err, results) => {
  //   if(err) console.error(err);
  //   res.status(200).json(results);
  // });
};



const addAnswer = (req, res) => {
};

const markAhelpful = (req, res) => {
  const id = req.params.answer_id;
  pool
    .query(queries.markAhelpful, [id])
    .then((results) => res.status(204))
    .catch((err) => console.error(err));
};

const reportAnswer = (req, res) => {
  const id = req.params.answer_id;
  pool
    .query(queries.reportAnswer, [id])
    .then((results) => res.status(204))
    .catch((err) => console.error(err));
};



module.exports = {
  getQuestionsById,
  getAnswersById,
  addQuestion,
  markQuestionHelpful,
  reportQuestion,
  addAnswer,
  markAhelpful,
  reportAnswer,
  getQuestion
};