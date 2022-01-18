const getQuestion = `SELECT q.question_id, q.body AS question_body, q.date_timestamp AS question_date, q.asker_name, q.helpful AS question_helpfulness, q.reported,
                  coalesce(json_agg(
                    json_build_object(
                      'id', answers.answer_id,
                      'body', answers.body,
                      'date', answers.date_timestamp,
                      'answerer_name', answers.answerer_name,
                      'helpfulness', answers.helpful
                    )
                  ) FILTER (WHERE answers.answer_id IS NOT NULL), '[]') AS answers
                  FROM questions q
                  LEFT JOIN answers ON q.question_id = answers.question_id
                  WHERE q.product_id = $1 AND q.reported = false
                  GROUP BY q.question_id
                  ORDER BY q.helpful DESC
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