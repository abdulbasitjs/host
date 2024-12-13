import jestBaseConfig from '../../tests/config/jest.base';

export default {
  ...jestBaseConfig,
  displayName: 'ui',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/ui',
};
