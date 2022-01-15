const getQuestion =`SELECT * FROM questions WHERE product_id=$1 AND reported=false ORDER BY helpful DESC LIMIT $2;`;
const addQuestion =`INSERT INTO questions (product_id, body, asker_name, asker_email, reported, helpful, date_timestamp) VALUES ($1, $2, $3, $4, DEFAULT, DEFAULT, DEFAULT);`;
const markQuestionHelpful = `UPDATE questions SET helpful = helpful + 1 WHERE question_id = $1`;
module.exports = {
  getQuestion,
  addQuestion,
  markQuestionHelpful,
};