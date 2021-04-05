const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs')
const server = new http.Server();

server.on('request', (req, res) => {
  const filename = url.parse(req.url).pathname.slice(1);

  const filepath = path.join(__dirname, 'files', filename);

  if (filename.split('/').length !== 1) {
    res.statusCode = 400;
    res.end();
  }

  if (!fs.existsSync(filepath)) {
    res.statusCode = 404;
    res.end();
  }

  switch (req.method) {
    case 'DELETE':
      fs.unlink(filepath, () => null)
      res.statusCode = 200;
      res.end()
      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
