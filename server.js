const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const COUNT_FILE = path.join(DATA_DIR, 'count.txt');
const LOG_FILE = path.join(DATA_DIR, 'visitors.txt');
const ADMIN_PASSWORD = 'corina123';

function ensureDataFiles() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
  if (!fs.existsSync(COUNT_FILE)) fs.writeFileSync(COUNT_FILE, '0', 'utf8');
  if (!fs.existsSync(LOG_FILE)) fs.writeFileSync(LOG_FILE, '', 'utf8');
}

function collectRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1e6) {
        req.socket.destroy();
        reject(new Error('Payload demasiado grande'));
      }
    });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

function readCount() {
  try {
    return parseInt(fs.readFileSync(COUNT_FILE, 'utf8'), 10) || 0;
  } catch {
    return 0;
  }
}

function writeCount(count) {
  fs.writeFileSync(COUNT_FILE, String(count), 'utf8');
}

function appendLog(entry) {
  fs.appendFileSync(LOG_FILE, entry + '\n', 'utf8');
}

function sendJson(res, obj) {
  const json = JSON.stringify(obj);
  res.writeHead(200, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  res.end(json);
}

function sendFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.m4a': 'audio/mpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
  };

  const type = mimeTypes[ext] || 'application/octet-stream';
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
      res.end('Archivo no encontrado');
      return;
    }
    res.writeHead(200, {'Content-Type': type, 'Cache-Control': 'no-cache'});
    res.end(data);
  });
}

ensureDataFiles();

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname;

  if (pathname === '/visit') {
    const now = new Date().toISOString();
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress || 'unknown';
    const lang = req.headers['accept-language']?.split(',')[0] || 'unknown';
    const referer = req.headers.referer || req.headers.origin || 'direct';
    const ua = req.headers['user-agent']?.replace(/\s+/g, ' ') || 'unknown';
    const count = readCount() + 1;
    writeCount(count);
    appendLog(`${now} | ${ip} | ${lang} | ${referer} | ${ua}`);
    sendJson(res, {count});
    return;
  }

  if (pathname === '/admin') {
    sendFile(res, path.join(__dirname, 'admin.html'));
    return;
  }

  if (pathname === '/admin/data' && req.method === 'POST') {
    collectRequestBody(req)
      .then((body) => {
        let payload;
        try {
          payload = JSON.parse(body || '{}');
        } catch {
          throw new Error('invalid');
        }

        if (payload.password !== ADMIN_PASSWORD) {
          res.writeHead(403, {'Content-Type': 'application/json; charset=utf-8'});
          res.end(JSON.stringify({error: 'contraseña inválida'}));
          return;
        }

        const count = readCount();
        const logs = fs.readFileSync(LOG_FILE, 'utf8').trim();
        sendJson(res, {count, logs});
      })
      .catch(() => {
        res.writeHead(400, {'Content-Type': 'application/json; charset=utf-8'});
        res.end(JSON.stringify({error: 'Solicitud inválida'}));
      });
    return;
  }

  let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);
  filePath = path.normalize(filePath);

  if (!filePath.startsWith(path.join(__dirname, ''))) {
    res.writeHead(403, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end('Acceso denegado');
    return;
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    sendFile(res, filePath);
    return;
  }

  res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
  res.end('No se encontró el recurso');
});

server.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
  console.log('Cada visita se registra en data/visitors.txt y el total en data/count.txt');
});
