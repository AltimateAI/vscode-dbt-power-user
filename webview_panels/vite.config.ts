import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
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
    },
  },
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
  },
});
