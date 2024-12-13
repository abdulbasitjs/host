import jestBaseConfig from '../../tests/config/jest.base';

export default {
  ...jestBaseConfig,
  displayName: 'assets',
  preset: '../../jest.preset.js',
  passWithNoTests: true,
  coverageDirectory: '../../coverage/libs/assets',
};
