import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      reporter: ['text', 'html']
    },
    include: ["tests/**/*.test.ts"],
  }
})