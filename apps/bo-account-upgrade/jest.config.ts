import jestBaseConfig from '../../tests/config/jest.base';

export default {
  ...jestBaseConfig,
  displayName: 'bo-account-upgrade',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/apps/bo-account-upgrade',
};
