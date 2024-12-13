import jestBaseConfig from '../../tests/config/jest.base';

export default {
  ...jestBaseConfig,
  displayName: 'host',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/apps/host',
  moduleDirectories: ['node_modules', '/../../tests/__mocks__'],
};
