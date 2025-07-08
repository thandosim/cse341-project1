import jsConfig from '@eslint/js';
import globals from 'globals';
import markdownPlugin from '@eslint/markdown';
import cssPlugin from '@eslint/css';
import prettierPlugin from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  // JavaScript + Node.js
  {
    files: ['**/*.{js,cjs,mjs}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'commonjs',
      globals: globals.node,
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...jsConfig.configs.recommended.rules,
      'prettier/prettier': 'error',
      'no-console': 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: 'req|res|next' }],
    },
  },

  // Markdown (GFM)
  {
    files: ['**/*.md'],
    language: 'markdown/gfm',
    plugins: {
      markdown: markdownPlugin,
    },
    rules: {
      ...markdownPlugin.configs.recommended.rules,
    },
  },

  // CSS
  {
    files: ['**/*.css'],
    language: 'css/css',
    plugins: {
      css: cssPlugin,
    },
    rules: {
      ...cssPlugin.configs.recommended.rules,
    },
  },
]);
