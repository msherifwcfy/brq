import { defineConfig } from "@ts-sdk-gen/openapi-ts";

const config = defineConfig({
  apiConfigFile: "./api.config.ts",
  client: {
    name: "@ts-sdk-gen/client-fetch",
  },
  input: {
    path: `https://apistg.barqsystems.com/docs-json`,
  },
  output: {
    format: "prettier",
    lint: "eslint",
    path: "./src/sdk",
  },
  plugins: ["@tanstack/react-query"],
  watch: true, // Enable watch mode
});

export default config;
