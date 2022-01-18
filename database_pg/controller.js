const pool = require('./db.js');
const queries = require('./queries.js');

const getQuestionsById = (req, res) => {
  //const id = parseInt(req.params.product_id);
  const id = parseInt(req.query.product_id);
  const page = req.query.page || 1;
  const count = req.query.count || 5;
  const values = [id, page * count];
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

const addQuestion = (req, res) => {
  const {product_id, body, name, email } = req.body;
  const values = [product_id, body, name, email];
  console.log(req.body);
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
    res.status(204).send('successful mark helpful');
  })
  .catch((err) => {
    res.send(err);
    console.error(err);
  });
};

const reportQuestion = (req, res) => {
  const id = req.params.question_id;
  pool
    .query(queries.reportQuestion, [id])
    .then((results) => res.status(204).send('success report question'))
    .catch((err) => console.error(err));
};

const getAnswersById = (req, res) => {
  const id = parseInt(req.params.question_id);
  const page = req.query.page || 1;
  const count = req.query.count || 5;
  const values = [id, page * count];
  pool
    .query(queries.getAnswer, values)
    .then((results) => {
      const answers = {
        "question": id,
        "page": page,
        "count": count,
        "results": results.rows
      };
      res.status(200).json(answers);
    })
    .catch((err) => {
      console.error(err);
      res.send(err);
    })
};



const addAnswer = (req, res) => {
  const id = parseInt(req.params.question_id);
  const { body, name, email, photos } = req.body;
  const values = [id, body, name, email];
  pool
    .query(queries.addAnswer, values)
    .then((results) => {
      const ans_id = results.rows[0].answer_id;
      photos.forEach((url) => {
        pool
          .query(queries.addPhoto, [ans_id, url])
          .then(() => {
            console.log('success add photo');
          })
      })
      res.status(201).send('success add an answer');
    })
    .catch((err) => res.status(400).send(err))
};

const markAhelpful = (req, res) => {
  const id = req.params.answer_id;
  pool
    .query(queries.markAhelpful, [id])
    .then((results) => {
      res.status(204).send('success mark an answer helpful');
      console.log('success mark an answer helpful');
    })
    .catch((err) => console.error(err));
};

const reportAnswer = (req, res) => {
  const id = req.params.answer_id;
  pool
    .query(queries.reportAnswer, [id])
    .then((results) => {
      res.status(204).send('succes report an answer');
      console.log('success report an answer');
    })
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
};