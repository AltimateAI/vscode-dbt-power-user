import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
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
    cssInjectedByJsPlugin(),
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
    'process.env': {}
  },
  build: {
    lib: {
      entry: "./src/notebook/index.tsx", // Entry point for your library
      // exports: "named", // Use named exports
      formats: ["es"],
      // name: "NotebookRenderer", // Name of the library
    },
    minify: false,
    commonjsOptions: {},
    
    rollupOptions: {
      // input: './src/notebook/index.tsx',
      output: {
        entryFileNames: `assets/renderer.js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
        // exports: "named",
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
