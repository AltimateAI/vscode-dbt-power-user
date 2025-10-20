import { defineConfig } from "@rsbuild/core";
import { cpSync, existsSync } from "fs";
import path from "path";

export default defineConfig({
  source: {
    entry: {
      extension: "./src/extension.ts",
    },
  },
  output: {
    target: "node",
    filename: {
      js: "[name].js",
    },
    distPath: {
      root: "dist",
    },
    cleanDistPath: false, // Don't clean dist as webview panels also build there
    sourceMap: {
      js: "source-map",
    },
  },
  resolve: {
    alias: {
      "@extension": path.resolve(__dirname, "./src/modules.ts"),
      "@lib": path.resolve(__dirname, "./src/lib/index"),
    },
    extensions: [".ts", ".js"],
  },
  tools: {
    rspack: (config) => {
      // Configure Node.js externals
      config.externals = [
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
      ];

      // Set __dirname to false for Node.js compatibility
      config.node = {
        __dirname: false,
      };

      // Set library target to commonjs2
      config.output = {
        ...config.output,
        libraryTarget: "commonjs2",
        devtoolModuleFilenameTemplate: "../[resource-path]",
      };

      // Use ts-loader instead of swc-loader for TypeScript decorators support
      config.module = config.module || {};
      config.module.rules = config.module.rules || [];

      // Remove the default TypeScript rule
      config.module.rules = config.module.rules.filter((rule: any) => {
        if (typeof rule === "object" && rule.test) {
          const testStr = rule.test.toString();
          return !testStr.includes("ts");
        }
        return true;
      });

      // Add ts-loader rule for TypeScript files
      config.module.rules.push({
        test: /\.ts$/,
        exclude: /(node_modules|src\/test)/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      });

      return config;
    },
  },
  performance: {
    chunkSplit: {
      strategy: "all-in-one",
    },
  },
  dev: {
    writeToDisk: true,
  },
  plugins: [
    {
      name: "copy-plugin",
      setup(api) {
        api.onBeforeBuild(() => {
          // Copy Python files and dependencies
          const patterns = [
            {
              from: path.resolve(__dirname, "altimate_notebook_kernel.py"),
              to: path.resolve(__dirname, "dist/altimate_notebook_kernel.py"),
            },
            {
              from: path.resolve(__dirname, "dbt_core_integration.py"),
              to: path.resolve(__dirname, "dist/dbt_core_integration.py"),
            },
            {
              from: path.resolve(__dirname, "dbt_cloud_integration.py"),
              to: path.resolve(__dirname, "dist/dbt_cloud_integration.py"),
            },
            {
              from: path.resolve(__dirname, "dbt_healthcheck.py"),
              to: path.resolve(__dirname, "dist/dbt_healthcheck.py"),
            },
            {
              from: path.resolve(
                __dirname,
                "node_modules/python-bridge/node_python_bridge.py",
              ),
              to: path.resolve(__dirname, "dist/node_python_bridge.py"),
            },
            {
              from: path.resolve(__dirname, "altimate_packages/"),
              to: path.resolve(__dirname, "dist/altimate_packages/"),
            },
          ];

          patterns.forEach(({ from, to }) => {
            try {
              cpSync(from, to, { recursive: true });
            } catch (error) {
              console.error(`Failed to copy ${from}:`, error);
            }
          });

          // Copy notebook modules
          try {
            console.log("copying notebook modules");
            const notebookModules = [
              "./node_modules/zeromq",
              "./node_modules/@aminya/node-gyp-build",
              "./node_modules/node-gyp-build",
            ];

            notebookModules.forEach((modulePath) => {
              if (existsSync(modulePath)) {
                const destPath = modulePath.replace(
                  "./node_modules",
                  "./dist/node_modules",
                );
                cpSync(modulePath, destPath, { recursive: true });
              } else {
                console.warn(`Module not found: ${modulePath}`);
              }
            });
            console.log("copied notebook modules");
          } catch (error) {
            console.error("Failed to copy notebook modules:", error);
          }
        });
      },
    },
  ],
});
