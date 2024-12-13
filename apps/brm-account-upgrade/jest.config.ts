import jestBaseConfig from '../../tests/config/jest.base';

export default {
  ...jestBaseConfig,
  displayName: 'brm-account-upgrade',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/apps/brm-account-upgrade',
};
