import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  setupFilesAfterEnv: ['<rootDir>/src/app/__tests__/setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
};

export default createJestConfig(config);