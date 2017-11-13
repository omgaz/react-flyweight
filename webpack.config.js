var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.js(x?)$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|build)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  externals: {
    'react': 'commonjs react',
    'prop-types': 'commonjs prop-types',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
      sourceMap: false,
      include: /\.js$/,
      parallel: {
        cache: true,
        workers: 2,
      },
    }),
  ]
};
