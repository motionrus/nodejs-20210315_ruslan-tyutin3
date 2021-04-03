const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');
const LimitSizeStream = require('./LimitSizeStream');
const server = new http.Server();
function isValid(pathname) {
  return (pathname.split('/').length === 1);
}


function writeData(req, res, filepath) {
  const fileStream = fs.createWriteStream(filepath, {flags: 'wx'})
  const limitStream = new LimitSizeStream({limit: 1024000})
  req.pipe(limitStream).pipe(fileStream)

  limitStream.on('error', (err) => {
    if (err.code === "LIMIT_EXCEEDED") {
      res.statusCode = 413
      res.end('LIMIT_EXCEEDED')
    }
    fs.unlink(filepath, () => null)
  })

  limitStream.on('finish', () => {
    res.statusCode = 201
    res.end()
  })

  req.on('close' ,() => {
    if (!fileStream.writableEnded) {
      fs.unlink(filepath, () => null)
    }
  })
}

server.on('request', (req, res) => {
  const filename = url.parse(req.url).pathname.slice(1);
  const filepath = path.join(__dirname, 'files', filename);
  if (!isValid(filename)) {
    res.statusCode = 400;
    return res.end('does not valid path');
  }
  switch (req.method) {
    case 'POST':
      if (fs.existsSync(filepath)) {
        res.statusCode = 409;
        res.end();
      } else {
        writeData(req, res, filepath)
      }
      break;
    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;