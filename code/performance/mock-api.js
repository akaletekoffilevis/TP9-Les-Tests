// Mock minimal de l'API TaskFlow pour le smoke test k6 en CI.
// Il ne remplace pas les tests Spring : il vérifie seulement que le scénario
// de charge sait parler à une API qui répond.
const http = require('node:http');

const PORT = Number(process.env.PORT ?? 3000);

const server = http.createServer((request, response) => {
  if (request.method === 'GET' && request.url === '/health') {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('ok');
    return;
  }

  if (request.method === 'POST' && request.url === '/api/auth/login') {
    let body = '';
    request.on('data', (chunk) => {
      body += chunk;
    });
    request.on('end', () => {
      let credentials = {};
      try {
        credentials = JSON.parse(body);
      } catch {
        response.writeHead(400, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ error: 'JSON invalide' }));
        return;
      }

      if (
        credentials.email !== 'ada@exemple.fr' ||
        credentials.password !== 'secret'
      ) {
        response.writeHead(401, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ error: 'Identifiants incorrects' }));
        return;
      }

      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(
        JSON.stringify({ token: 'jwt-smoke', redirectTo: '/dashboard' }),
      );
    });
    return;
  }

  response.writeHead(404, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify({ error: 'Route inconnue' }));
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Mock API TaskFlow sur http://127.0.0.1:${PORT}`);
});
