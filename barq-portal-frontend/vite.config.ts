import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@root": path.resolve(__dirname, "./"),
    },
  },
  server: {
    port: 3001,
  },
  preview: {
    allowedHosts: ['cms.barq.wecodeforyou.io', 'connectorstg.barqsystems.com'],
    port: 5000,
    host: true,
  },
});
