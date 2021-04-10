module.exports = {
  mongodb: {
    uri: (process.env.NODE_ENV === 'test') ?
      'mongodb://root:example@localhost/6-module-2-task?authSource=admin' :
      'mongodb://root:example@localhost/any-shop?authSource=admin',
  },
};
