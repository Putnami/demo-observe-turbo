import { createServer } from 'node:http';
import { quote } from './quote.js';

const port = Number(process.env.PORT ?? 8080);

createServer((req, res) => {
  if (req.method !== 'POST' || req.url !== '/quote') {
    res.writeHead(404).end();
    return;
  }
  let raw = '';
  req.on('data', (chunk) => (raw += chunk));
  req.on('end', () => {
    let body: unknown;
    try {
      body = JSON.parse(raw);
    } catch {
      res.writeHead(400).end('invalid body');
      return;
    }
    const result = quote(body);
    res.writeHead(result.ok ? 200 : 422, { 'content-type': 'application/json' });
    res.end(JSON.stringify(result.ok ? result.quote : { error: result.error }));
  });
}).listen(port);
