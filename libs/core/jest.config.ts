import jestBaseConfig from '../../tests/config/jest.base';

export default {
  ...jestBaseConfig,
  displayName: 'core',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/core',
};
