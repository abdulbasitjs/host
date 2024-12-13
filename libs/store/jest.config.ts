import jestBaseConfig from '../../tests/config/jest.base';

export default {
  ...jestBaseConfig,
  displayName: 'store',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/store',
};
