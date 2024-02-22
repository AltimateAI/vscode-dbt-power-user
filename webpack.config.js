//@ts-check

"use strict";

const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

/**@type {import('webpack').Configuration}*/
const config = {
  target: "node",
  entry: path.resolve(__dirname, "src/extension.ts"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "extension.js",
    libraryTarget: "commonjs2",
    devtoolModuleFilenameTemplate: "../[resource-path]",
  },
  node: {
    __dirname: false,
  },
  devtool: "source-map",
  externals: [
    "vscode",
    "commonjs",
    // These dependencies are ignored because we don't use them, and App Insights has try-catch protecting their loading if they don't exist
    // See: https://github.com/microsoft/vscode-extension-telemetry/issues/41#issuecomment-598852991
    "applicationinsights-native-metrics",
    "@opentelemetry/tracing",
    "@azure/opentelemetry-instrumentation-azure-sdk",
    "@opentelemetry/instrumentation",
    "@azure/functions-core",
  ],
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "dbt_core_integration.py"),
          to: "dbt_core_integration.py",
        },
        {
          from: path.resolve(__dirname, "dbt_cloud_integration.py"),
          to: "dbt_cloud_integration.py",
        },
        {
          from: path.resolve(
            __dirname,
            "node_modules/python-bridge/node_python_bridge.py",
          ),
          to: "node_python_bridge.py",
        },
        {
          from: path.resolve(__dirname, "altimate_packages/"),
          to: "altimate_packages/",
        },
      ],
    }),
  ],
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
            indent_level: 1,
          },
        },
      }),
    ],
  },
};

module.exports = config;
