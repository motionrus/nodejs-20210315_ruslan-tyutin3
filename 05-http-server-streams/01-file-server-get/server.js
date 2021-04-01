const url = require("url");
const http = require("http");
const path = require("path");
const fs = require("fs");
const server = new http.Server();

function isValid(pathname) {
  return (pathname.split("/").length === 1);
}

server.on("request", (req, res) => {
  const pathname = url.parse(req.url).pathname.slice(1);
  const filepath = path.join(__dirname, "files", pathname);

  if (!isValid(pathname)) {
    res.statusCode = 400;
    return res.end("does not valid path");
  }

  switch (req.method) {
    case "GET":
      if (fs.existsSync(filepath)) {
        const readStream = fs.createReadStream(filepath);
        readStream.pipe(res);
      } else {
        res.statusCode = 404;
        res.end();
      }
      break;
    default:
      res.statusCode = 501;
      res.end("Not implemented");
  }
});

module.exports = server;
