colDROP DATABASE IF EXISTS questions;

CREATE DATABASE questions;

\c questions

CREATE TABLE IF NOT EXISTS questions (
  question_id SERIAL NOT NULL PRIMARY KEY,
  product_id INT NOT NULL,
  body TEXT NOT NULL,
  date_written BIGINT,
  asker_name TEXT NOT NULL,
  asker_email TEXT NOT NULL,
  reported BOOLEAN DEFAULT FALSE,
  helpful INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS answers (
  answer_id SERIAL NOT NULL PRIMARY KEY,
  question_id INT NOT NULL,
  body TEXT NOT NULL,
  date_written BIGINT,
  answerer_name TEXT NOT NULL,
  answer_email TEXT NOT NULL,
  reported BOOLEAN DEFAULT FALSE,
  helpful INT DEFAULT 0
);


CREATE TABLE IF NOT EXISTS ans_photos (
  id SERIAL NOT NULL PRIMARY KEY,
  answer_id INT NOT NULL REFERENCES answers(answer_id),
  img_url TEXT
);

COPY questions FROM '/Users/xinxu/Desktop/work/SDC-questionsAndAnswers-API/data/questions.csv' DELIMITERS ',' CSV HEADER;
COPY answers FROM '/Users/xinxu/Desktop/work/SDC-questionsAndAnswers-API/data/answers.csv' DELIMITERS ',' CSV HEADER;
COPY ans_photos FROM '/Users/xinxu/Desktop/work/SDC-questionsAndAnswers-API/data/answers_photos.csv' DELIMITERS ',' CSV HEADER;


ALTER TABLE questions ADD COLUMN date_timestamp TIMESTAMP;
ALTER TABLE questions
ALTER COLUMN date_timestamp SET DATA TYPE TIMESTAMP with time zone
USING TIMESTAMP with time zone 'epoch' + date_written * INTERVAL '1 millisecond',
ALTER COLUMN date_timestamp SET DEFAULT now();
ALTER TABLE questions DROP COLUMN date_written;

ALTER TABLE answers ADD COLUMN date_timestamp TIMESTAMP;
ALTER TABLE answers
ALTER COLUMN date_timestamp SET DATA TYPE TIMESTAMP with time zone
USING TIMESTAMP with time zone 'epoch' + date_written * INTERVAL '1 millisecond',
ALTER COLUMN date_timestamp SET DEFAULT now();
ALTER TABLE answers DROP COLUMN date_written;

SELECT SETVAL((SELECT PG_GET_SERIAL_SEQUENCE('"questions"', 'question_id')), (SELECT (MAX("question_id") + 1) FROM "questions"), FALSE);
SELECT SETVAL((SELECT PG_GET_SERIAL_SEQUENCE('"answers"', 'answer_id')), (SELECT (MAX("answer_id") + 1) FROM "answers"), FALSE);