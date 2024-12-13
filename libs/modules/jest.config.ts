import jestBaseConfig from '../../tests/config/jest.base';

export default {
  ...jestBaseConfig,
  displayName: 'modules',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/modules',
};
