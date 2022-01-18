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
  const url = `http://localhost:3000/api/qa/questions`;
  const body = JSON.stringify({
    product_id: `${randNum}`,
    body: 'test',
    name: 'test',
    email: 'test@mail.com'
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