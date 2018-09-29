const autoprefixer = require('autoprefixer');

module.exports = [{
  entry: ['./src/assets/scss/app.scss','./src/assets/js/app.js'],
  output: {
    filename: './jsrc/assets/js/bundle.js',
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: './jsrc/assets/css/bundle.css',
          },
        },
        { loader: 'extract-loader' },
        { loader: 'css-loader' },
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [autoprefixer()]
          }
        },
        {
          loader: 'sass-loader',
          options: {
            includePaths: ['./node_modules']
          }
        },
      ]
    }]
  },
}];
