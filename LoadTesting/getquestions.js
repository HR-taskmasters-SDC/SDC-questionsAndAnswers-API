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
  const url = `http://localhost:3000/api/qa/questions/?product_id=${randNum}`;
  const res = http.get(url);
  sleep(1);
  check(res, {
    'is status 200': r => r.status === 200,
    'transaction time < 200ms': r => r.timings.duration < 200,
    'transaction time < 500ms': r => r.timings.duration < 500,
    'transaction time < 5000ms': r => r.timings.duration < 5000,
    'transaction time < 8000ms': r => r.timings.duration < 8000,
  });
}