export const MFE_APP_NAME_INSIDE_ANGULAR_HOST = 'account-upgrade';
export const ANGULAR_HOST_APP_NAME = 'host';

export const EVENTS = {
  ROUTING: {
    REMOTE_NAVIGATION: '[account-upgrade]:remote-navigation',
    HOST_NAVIGATION: '[account-upgrade]:host-navigation',
    // TODO: this should be dynamic, and also sync with the host angular app
    MAIN_HOST_NAVIGATION: ANGULAR_HOST_APP_NAME,
    MAIN_REMOTE_NAVIGATION: MFE_APP_NAME_INSIDE_ANGULAR_HOST,
  },
} as const;
