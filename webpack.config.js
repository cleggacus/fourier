const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /.worker.js$/,
        use: { loader: "worker-loader" },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  externals: {
      test: "commonjs test"
  }
};