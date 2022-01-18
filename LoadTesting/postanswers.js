import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';

export const requests = new Counter('http_reqs');

export const options = {
  vus: 100,
  duration: '15s'
}


export default () => {
  const randNum = Math.ceil(Math.random() * 100);
  const url = `http://localhost:3000/api/qa/questions/${randNum}/answers`;
  const body = JSON.stringify({
    body: 'test',
    name: 'test',
    email: 'test@mail.com',
    photos: ['https://images.unsplash.com/photo-1511127088257-53ccfcc769fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80']
  });
  const params = {
    headers: {
      'Content-Type': 'application/json'
    },
  };
  const res = http.post(url, body, params);
  sleep(1);
  check(res, {
    'is status 201': r => r.status === 201,
    'transaction time < 200ms': r => r.timings.duration < 200,
    'transaction time < 500ms': r => r.timings.duration < 500,
    'transaction time < 1000ms': r => r.timings.duration < 1000,
    'transaction time < 2000ms': r => r.timings.duration < 2000,
  });
}