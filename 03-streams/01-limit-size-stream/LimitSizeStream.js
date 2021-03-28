const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  #limit = 0;
  #size = 0;
  constructor(options) {
    super(options);
    this.#limit = options.limit
  }

  _transform(chunk, encoding, callback) {
    this.#size += chunk.length
    if (this.#limit !== 0 && this.#size > this.#limit) {
      callback(new LimitExceededError(), "")
    }
    callback(undefined, chunk.toString())
  }
}

module.exports = LimitSizeStream;
