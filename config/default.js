const path = require('path');

const dirBase = path.resolve(__dirname, '..');

function base() {
  const args = [dirBase].concat([].slice.call(arguments));
  return path.resolve.apply(path, args);
}

module.exports = {
  server: {
    url: 'http://localhost',
    port: 3000,
  },

  project: {
    paths: {
      client: base.bind(null, 'src'),
      server: base.bind(null, 'server'),
      dist: base.bind(null, 'dist'),
      vendor: base.bind(null, 'node_modules'),
      test: base.bind(null, 'test'),
      webpack: base.bind(null, 'webpack'),
    }
  },
};
