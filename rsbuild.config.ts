import { defineConfig, RsbuildPlugin } from "@rsbuild/core";
import { cpSync, existsSync, readdirSync } from "fs";
import path from "path";

const DIST = path.resolve(__dirname, "dist");

const copyAssetsPlugin: RsbuildPlugin = {
  name: "copy-assets-plugin",
  setup(api) {
    api.onBeforeBuild(() => {
      const patterns = [
        {
          from: path.resolve(__dirname, "altimate_notebook_kernel.py"),
          to: path.join(
            DIST,
            "altimate_python_packages/altimate_notebook_kernel.py",
          ),
        },
        {
          from: path.resolve(
            __dirname,
            "node_modules/@altimateai/dbt-integration/dist/node_python_bridge.py",
          ),
          to: path.join(DIST, "node_python_bridge.py"),
        },
        {
          from: path.resolve(
            __dirname,
            "node_modules/@altimateai/dbt-integration/dist/altimate_python_packages/dbt_core_integration.py",
          ),
          to: path.join(
            DIST,
            "altimate_python_packages/dbt_core_integration.py",
          ),
        },
        {
          from: path.resolve(
            __dirname,
            "node_modules/@altimateai/dbt-integration/dist/altimate_python_packages/dbt_utils.py",
          ),
          to: path.join(DIST, "altimate_python_packages/dbt_utils.py"),
        },
        {
          from: path.resolve(
            __dirname,
            "node_modules/@altimateai/dbt-integration/dist/altimate_python_packages/altimate_packages/",
          ),
          to: path.join(DIST, "altimate_python_packages/altimate_packages/"),
        },
      ];

      for (const { from, to } of patterns) {
        try {
          cpSync(from, to, { recursive: true });
        } catch (error) {
          console.error(`Failed to copy ${from}:`, (error as Error).message);
        }
      }

      console.log("copying notebook modules");
      try {
        cpSync(
          path.resolve(__dirname, "node_modules/zeromq"),
          path.join(DIST, "node_modules/zeromq"),
          { recursive: true },
        );
      } catch (e) {
        console.warn(`Skipping zeromq: ${(e as Error).message}`);
      }

      try {
        const altimateCoreDir = path.dirname(
          require.resolve("@altimateai/core/package.json"),
        );
        cpSync(
          altimateCoreDir,
          path.join(DIST, "node_modules/@altimateai/core"),
          { recursive: true },
        );
      } catch (e) {
        console.warn(`Skipping @altimateai/core: ${(e as Error).message}`);
      }

      try {
        cpSync(
          path.resolve(__dirname, "node_modules/@altimateai/altimate-core"),
          path.join(DIST, "node_modules/@altimateai/altimate-core"),
          { recursive: true },
        );
        console.log("Copied @altimateai/altimate-core");
      } catch (e) {
        console.warn(
          `Skipping @altimateai/altimate-core: ${(e as Error).message}`,
        );
      }

      // Copy only the .node binary directly into the altimate-core/ directory —
      // skip the platform package directories entirely. napi-rs index.js falls back
      // to require('./altimate-core.<platform>.node') when the platform package
      // isn't found, so this works and halves VSIX size.
      const altimatePlatformPackages = [
        "@altimateai/altimate-core-darwin-arm64",
        "@altimateai/altimate-core-darwin-x64",
        "@altimateai/altimate-core-linux-arm64-gnu",
        "@altimateai/altimate-core-linux-x64-gnu",
        "@altimateai/altimate-core-win32-x64-msvc",
      ];
      const coreDistDir = path.join(
        DIST,
        "node_modules/@altimateai/altimate-core",
      );
      for (const pkg of altimatePlatformPackages) {
        const srcDir = path.resolve(__dirname, "node_modules", pkg);
        try {
          if (!existsSync(srcDir)) {
            continue;
          }
          for (const file of readdirSync(srcDir)) {
            if (file.endsWith(".node")) {
              cpSync(path.join(srcDir, file), path.join(coreDistDir, file));
              console.log(
                `Copied ${file} into altimate-core/ (skipped platform package dir)`,
              );
            }
          }
        } catch (e) {
          console.warn(`Skipping ${pkg}: ${(e as Error).message}`);
        }
      }

      try {
        cpSync(
          path.resolve(__dirname, "node_modules/@aminya/node-gyp-build"),
          path.join(DIST, "node_modules/@aminya/node-gyp-build"),
          { recursive: true },
        );
        cpSync(
          path.resolve(__dirname, "node_modules/node-gyp-build"),
          path.join(DIST, "node_modules/node-gyp-build"),
          { recursive: true },
        );
      } catch (e) {
        console.warn(`Skipping node-gyp-build: ${(e as Error).message}`);
      }
      console.log("copied notebook modules");
    });
  },
};

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
    // Webview panels also emit into dist/, so don't wipe it.
    cleanDistPath: false,
    sourceMap: {
      js: "source-map",
    },
    // Match the pre-rsbuild terser config (mangle: false, keep classnames/fnames)
    // so stack traces in VS Code remain actionable, while still getting dead-code
    // elimination and whitespace stripping.
    minify: {
      js: true,
      jsOptions: {
        minimizerOptions: {
          mangle: false,
          compress: {
            keep_classnames: true,
            keep_fnames: true,
          },
        },
      },
    },
  },
  resolve: {
    alias: {
      "@extension": path.resolve(__dirname, "./src/modules.ts"),
      "@lib": path.resolve(__dirname, "./src/lib/index"),
    },
    extensions: [".ts", ".js"],
  },
  performance: {
    chunkSplit: {
      strategy: "all-in-one",
    },
  },
  dev: {
    writeToDisk: true,
  },
  tools: {
    rspack: (config) => {
      config.externals = [
        "vscode",
        "commonjs",
        // Ignored because we don't use them, and App Insights has try/catch
        // guarding their loading: https://github.com/microsoft/vscode-extension-telemetry/issues/41#issuecomment-598852991
        "applicationinsights-native-metrics",
        "@opentelemetry/tracing",
        "@azure/opentelemetry-instrumentation-azure-sdk",
        "@opentelemetry/instrumentation",
        "@azure/functions-core",
        "zeromq",
        "@altimateai/core",
        "@altimateai/altimate-core",
        "@altimateai/altimate-core-darwin-arm64",
        "@altimateai/altimate-core-darwin-x64",
        "@altimateai/altimate-core-linux-arm64-gnu",
        "@altimateai/altimate-core-linux-x64-gnu",
        "@altimateai/altimate-core-win32-x64-msvc",
      ];

      config.node = { __dirname: false };

      config.output = {
        ...config.output,
        libraryTarget: "commonjs2",
        devtoolModuleFilenameTemplate: "../[resource-path]",
      };

      // Use ts-loader so inversify's decorators + emitDecoratorMetadata keep working.
      config.module = config.module || {};
      config.module.rules = (config.module.rules || []).filter((rule: any) => {
        if (rule && typeof rule === "object" && rule.test instanceof RegExp) {
          return !rule.test.test("file.ts");
        }
        return true;
      });
      config.module.rules.push({
        test: /\.ts$/,
        exclude: /(node_modules|src\/test)/,
        use: [{ loader: "ts-loader" }],
      });

      return config;
    },
  },
  plugins: [copyAssetsPlugin],
});
