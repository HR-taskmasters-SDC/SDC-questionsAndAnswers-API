const getQuestion = `SELECT question_id, body AS question_body, date_timestamp AS question_date, asker_name, helpful AS question_helpfulness, reported
                  FROM questions
                  WHERE product_id = $1 AND reported = false
                  ORDER BY helpful DESC
                  LIMIT $2
                  OFFSET $3;`;

const addQuestion =`INSERT INTO questions (product_id, body, asker_name, asker_email, reported, helpful, date_timestamp)
                    VALUES ($1, $2, $3, $4, DEFAULT, DEFAULT, DEFAULT);`;

const markQuestionHelpful = `UPDATE questions SET helpful = helpful + 1
                            WHERE question_id = $1`;
const reportQuestion = `UPDATE questions SET reported = true
                        WHERE question_id = $1`;
const markAhelpful = `UPDATE answers SET helpful = helpful + 1
                      WHERE answer_id = $1`;
const reportAnswer = `UPDATE answers SET reported = true
                      WHERE answer_id = $1`;

const getAnswer = `SELECT a.answer_id, a.body, a.date_timestamp as date, a.answerer_name, a.helpful as helpfulness,
                      (
                        SELECT array_to_json(coalesce(array_agg(photos), array[]::record[]))
                        FROM
                        (
                          SELECT photos.id, photos.img_url as url
                          FROM answers
                          INNER JOIN ans_photos photos
                          ON answers.answer_id = photos.answer_id
                          WHERE photos.answer_id = a.answer_id
                        ) photos
                      ) AS photos
                      FROM answers a
                      WHERE a.question_id = $1 AND a.reported = false
                      ORDER BY a.helpful DESC
                      LIMIT $2
                      OFFSET $3;`;

const addAnswer = `INSERT INTO answers (question_id, body, answerer_name, answer_email, reported, helpful, date_timestamp)
                  VALUES ($1, $2, $3, $4, DEFAULT, DEFAULT, DEFAULT)
                  RETURNING answer_id;`;

const addPhoto = `INSERT INTO ans_photos (answer_id, img_url)
                  VALUES ($1, $2);`;

module.exports = {
  getQuestion,
  addQuestion,
  markQuestionHelpful,
  reportQuestion,
  markAhelpful,
  reportAnswer,
  getAnswer,
  addAnswer,
  addPhoto
};