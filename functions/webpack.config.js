module.exports = {
     entry: ‘../src/index.js’,
     output: {
          filename: ‘./bundle.js’
     }
}

module.exports = (env, argv) => {

  if (argv.mode === 'development') {
    config.devtool = 'source-map';
  }

  if (argv.mode === 'production') {
    //...
  }

  return config;
};