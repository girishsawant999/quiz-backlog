import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    checker({
      typescript: true,
    }),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
