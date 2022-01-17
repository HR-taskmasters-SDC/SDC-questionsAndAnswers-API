import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  http.get('localhost:3000/api/qa/questions');
  sleep(1);
}