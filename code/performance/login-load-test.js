// Test de charge k6 — connexion TaskFlow.
//
// Charge complète (par défaut) :
//   k6 run code/performance/login-load-test.js
//
// Smoke test pour la CI (2 utilisateurs virtuels, 5 secondes) :
//   SMOKE=1 VUS=2 DURATION=5s BASE_URL=http://localhost:3000 \
//     k6 run code/performance/login-load-test.js
import http from 'k6/http';
import { check, sleep } from 'k6';

const smoke = __ENV.SMOKE === '1';

export const options = {
  ...(smoke
    ? {
        vus: Number(__ENV.VUS ?? 2),
        duration: __ENV.DURATION ?? '5s',
      }
    : {
        stages: [
          { duration: '30s', target: 50 }, // montée en charge
          { duration: '1m', target: 50 }, // plateau : 50 utilisateurs virtuels
          { duration: '20s', target: 0 }, // descente
        ],
      }),
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95 % des requêtes < 500 ms
    http_req_failed: ['rate<0.01'], // moins de 1 % d'erreurs
  },
};

export default function () {
  const baseUrl = __ENV.BASE_URL ?? 'http://localhost:8080';
  const response = http.post(
    `${baseUrl}/api/auth/login`,
    JSON.stringify({
      email: 'ada@exemple.fr',
      password: 'secret',
    }),
    { headers: { 'Content-Type': 'application/json' } },
  );

  check(response, {
    'statut HTTP 200': (res) => res.status === 200,
    'jeton présent': (res) => Boolean(res.json('token')),
  });

  sleep(1);
}
