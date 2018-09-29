const autoprefixer = require('autoprefixer');

module.exports = [{
  entry: ['./src/assets/scss/app.scss','./src/assets/js/app.js', './src/assets/images/logo.png'],
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
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: [
        {
          'file-loader',
          options:
        }
      ]
    }]
  },
}];
