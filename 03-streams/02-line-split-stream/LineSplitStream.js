const stream = require("stream");
const os = require("os");


class LineSplitStream extends stream.Transform {
  lastElement = "";

  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, callback) {
    const arr = (this.lastElement + chunk).toString().split(os.EOL);
    this.lastElement = arr.pop();
    arr.forEach(elem => this.push(elem));

    callback(null);
  }

  _flush(callback) {
    callback(null, this.lastElement);
  }
}

module.exports = LineSplitStream;
