//@ts-check

'use strict';

const TerserPlugin = require("terser-webpack-plugin");
const path = require('path');

/**@type {import('webpack').Configuration}*/
const config = {
  target: 'node',
  entry: path.resolve(__dirname, "src/extension.ts"),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'extension.js',
    libraryTarget: 'commonjs2',
    devtoolModuleFilenameTemplate: '../[resource-path]'
  },
  node: {
    __dirname: false
  },
  devtool: 'source-map',
  externals: {
    vscode: 'commonjs vscode',
    'applicationinsights-native-metrics': 'commonjs applicationinsights-native-metrics' // ignored because we don't ship native module
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
          mangle: false,
          sourceMap: true,
          // compress: false,
          keep_classnames: /AbortSignal/,
          keep_fnames: /AbortSignal/,
          output: {
            beautify: true,
            indent_level: 1
          }
        }
      }),
    ],
  }
};

module.exports = config;