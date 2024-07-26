import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";
import { cpSync } from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgr(),
    react(),
    cssInjectedByJsPlugin({
      //   cssAssetsFilterFunction: (outputAsset) => {
      //     console.log("outputAsset.fileName", outputAsset.fileName)
      //     return outputAsset.fileName !== 'assets/style.css';
      // }
      jsAssetsFilterFunction: function customJsAssetsfilterFunction(
        outputChunk,
      ) {
        return (
          outputChunk.fileName == "assets/renderer.js" ||
          outputChunk.fileName == "assets/main.js"
        );
      },
    }),
    {
      name: "copy-codicons",
      renderStart: () => {
        cpSync(
          "./node_modules/@vscode/codicons/dist",
          "./dist/assets/codicons/",
          { recursive: true },
        );
      },
    },
  ],
  define: {
    "process.env": {},
  },
  build: {
    lib: {
      entry: { main: "./src/main.tsx", renderer: "./src/notebook/index.tsx" },
      // exports: "named", // Use named exports
      formats: ["es"],
      // fileName: `assets/renderer.js`,
      // name: "NotebookRenderer", // Name of the library
    },
    // minify: false,
    commonjsOptions: {},

    rollupOptions: {
      // input: "./src/main.tsx",
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
  resolve: {
    alias: {
      "@uicore": path.resolve(__dirname, "./src/uiCore"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@modules": path.resolve(__dirname, "./src/modules"),
      "@testUtils": path.resolve(__dirname, "./src/testUtils"),
      "@vscodeApi": path.resolve(__dirname, "./src/modules/vscode"),
      "@lib": path.resolve(__dirname, "./src/lib"),
    },
  },
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
  },
});
