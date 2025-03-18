//@ts-check

"use strict";

const WebpackShellPluginNext = require("webpack-shell-plugin-next");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const { cpSync } = require("fs");

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
    "zeromq",
  ],
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "@extension": path.resolve(__dirname, "./src/modules.ts"),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /(node_modules|src\/test)/,
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
          from: path.resolve(__dirname, "altimate_notebook_kernel.py"),
          to: "altimate_notebook_kernel.py",
        },
        {
          from: path.resolve(__dirname, "dbt_core_integration.py"),
          to: "dbt_core_integration.py",
        },
        {
          from: path.resolve(__dirname, "dbt_cloud_integration.py"),
          to: "dbt_cloud_integration.py",
        },
        {
          from: path.resolve(__dirname, "dbt_healthcheck.py"),
          to: "dbt_healthcheck.py",
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
    new WebpackShellPluginNext({
      onBuildStart: {
        scripts: [
          () => {
            try {
              console.log("copying notebook modules");
              cpSync("./node_modules/zeromq", "./dist/node_modules/zeromq", {
                recursive: true,
              });
              cpSync(
                "./node_modules/@aminya/node-gyp-build",
                "./dist/node_modules/@aminya/node-gyp-build",
                {
                  recursive: true,
                },
              );
              cpSync(
                "./node_modules/node-gyp-build",
                "./dist/node_modules/node-gyp-build",
                {
                  recursive: true,
                },
              );
              console.log("copied notebook modules");
            } catch (error) {
              console.error(error.message);
            }
          },
        ],
        blocking: true,
        parallel: false,
      },
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

module.exports = [config];
