const path = require('path');
const package = require('./package.json');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(m?js|ts|tsx|jsx|js)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    browsers: '> 1%, IE 11, not dead, node 10',
                  },
                  modules: false, // Needed for tree shaking to work.
                },
              ],
            ],
          },
        },
      },
      { test: /\.tsx?$/, loader: 'ts-loader' },
    ],
  },
  target: 'web', // or web
  entry: {
    'kross-SDK': path.resolve(__dirname, 'src/index.ts'),
  },
  resolve: {
    mainFiles: ['index'],
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
    },
  },

  output: {
    filename: `index.js`,
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
    globalObject: 'this',
  },

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-native': 'react-native',
    'react-query': 'react-query',
    '@react-native-async-storage/async-storage':
      '@react-native-async-storage/async-storage',
    'date-fns': 'date-fns',
  },

  mode: 'production',

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/,
          reuseExistingChunk: true,
        },
      },
      filename: `index.min.js`,
      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
    },
  },
  stats: {
    colors: true,
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  devtool: 'source-map',
};
