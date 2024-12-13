import jestBaseConfig from '../../tests/config/jest.base';

export default {
  ...jestBaseConfig,
  displayName: 'shared',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/shared',
};
