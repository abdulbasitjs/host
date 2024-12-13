import { commonConfig } from './common.config';

const jestBaseConfig = {
  ...commonConfig,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/../../tests/config/jest.setup.ts'],
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
  },
};

export default jestBaseConfig;
