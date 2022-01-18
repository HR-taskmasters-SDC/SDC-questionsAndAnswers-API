const csv = require('csv-parser');
const fs = require('fs');
//const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const questions = [];

fs.createReadStream(`../data/questions.csv`)
  .pipe(csv())
  .on('data', (data) => questions.push(data))
  .on('end', () => {
    console.log(questions[0,5]);
  })