module.exports = {
  mode: 'development',
  resolve: {
    modules: [__dirname + '/../bower_components', __dirname + '/../node_modules'],
    mainFiles: ['index', 'main']
  },
  output: {
    path: __dirname + '/public/'
  },
  entry: {
    'main': './demos/src/demo'
  }
};
