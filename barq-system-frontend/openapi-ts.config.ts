import { defineConfig } from '@ts-sdk-gen/openapi-ts';

const config = defineConfig({
  apiConfigFile: './api.config.ts',
  client: {
    name: '@ts-sdk-gen/client-fetch',
  },
  input: {
    path:'https://api.barq.wecodeforyou.io/docs-json' , // env doesnt work here
  },
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src/sdk',
  },
  plugins: ['@tanstack/react-query'],
  watch: false, // Enable watch mode
});

export default config;
