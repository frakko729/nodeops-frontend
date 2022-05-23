import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import svgLoader from "vite-svg-loader";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    svgLoader(),
  ],
  resolve: {
    dedupe: ["vue"],
    alias: {
      "@": path.resolve(__dirname, "/src"),
    },
  },
  define: {
    "process.env": process.env,
  },
  build: {},
});
