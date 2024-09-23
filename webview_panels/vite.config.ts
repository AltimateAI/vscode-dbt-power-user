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
  build: {
    rollupOptions: {
      input: "./src/main.tsx",
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
      "@telemetryEvents": path.resolve(__dirname, "../src/telemetry/events.ts"),
      "@lib": path.resolve(__dirname, "./src/lib"),
    },
  },
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
  },
});
