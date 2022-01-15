const router = require('express').Router();
const controller = require('../database_pg/controller.js');

router.route('/qa/questions')
  .get(controller.getQuestionsById)
  .post(controller.addQuestion)

router.route('/qa/questions/:question_id/helpful')
  .put(controller.markQuestionHelpful)

router.route('/qa/questions/:question_id/report')
  .put(controller.reportQuestion)

router.route('/qa/questions/:question_id/answers')
  .get(controller.getAnswersById)
  .post(controller.addAnswer)

router.route('/qa/answers/:answer_id/helpful')
  .put(controller.markAhelpful)

router.route('/qa/answers/:answer_id/report')
  .put(controller.reportAnswer)

module.exports = router;