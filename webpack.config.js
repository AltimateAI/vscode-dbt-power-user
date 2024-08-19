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
    "zeromqold",
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
              console.log("copying zeromq module");
              cpSync("./node_modules/zeromq", "./dist/node_modules/zeromq", {
                recursive: true,
              });
              cpSync(
                "./node_modules/zeromqold",
                "./dist/node_modules/zeromqold",
                {
                  recursive: true,
                },
              );
              cpSync(
                "./node_modules/zeromqold",
                "./dist/node_modules/zeromqold",
                {
                  recursive: true,
                },
              );
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
              console.log("copied zeromq module");
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

const rendererConfig = {
  devtool: "source-map",
  target: ["web", "es5"],
  externals: {
    vscode: "commonjs vscode",
    zeromq: "zeromq",
  },
  entry: "./webview_panels/src/notebook/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "renderer.js",
    libraryTarget: "module",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".css"],
    alias: {
      "@uicore": path.resolve(__dirname, "./webview_panels/src/uiCore"),
      "@assets": path.resolve(__dirname, "./webview_panels/src/assets"),
      "@modules": path.resolve(__dirname, "./webview_panels/src/modules"),
      "@testUtils": path.resolve(__dirname, "./webview_panels/src/testUtils"),
      "@vscodeApi": path.resolve(
        __dirname,
        "./webview_panels/src/modules/vscode",
      ),
      "@lib": path.resolve(__dirname, "./webview_panels/src/lib"),
    },
  },
  experiments: {
    outputModule: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: path.resolve(
                __dirname,
                "./webview_panels/tsconfig.json",
              ),
              projectReferences: true,
              compilerOptions: {
                module: "esnext",
                noEmit: false,
                outDir: "../../out/src/renderer",
              },
            },
          },
          // {
          //   loader: "esbuild-loader",
          //   options: {
          //     loader: "tsx", // Remove this if you're not using JSX
          //     target: "es2015", // Syntax to compile to (see options below for possible values)
          //   },
          // },
        ],
      },
      {
        test: /\.css$/i,
        use: ["raw-loader"],
      },
    ],
  },
};

module.exports = [config];
