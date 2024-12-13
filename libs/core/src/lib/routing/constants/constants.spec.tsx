import { EVENTS } from './events';
import { HOST_FEDERATED_BASE_PATH, MFE_APPS_BASE_PATH } from './routes';

describe('Constants', () => {
  describe('Events', () => {
    it('should have the correct events', () => {
      expect(EVENTS.ROUTING.MAIN_HOST_NAVIGATION).toBe('host');
      expect(EVENTS.ROUTING.MAIN_REMOTE_NAVIGATION).toBe('account-upgrade');
      expect(EVENTS.ROUTING.HOST_NAVIGATION).toBe(
        '[account-upgrade]:host-navigation',
      );
      expect(EVENTS.ROUTING.REMOTE_NAVIGATION).toBe(
        '[account-upgrade]:remote-navigation',
      );
    });
  });

  describe('Routes', () => {
    it('should have the correct routes', () => {
      expect(HOST_FEDERATED_BASE_PATH).toBe('/onboarding-v3');
      expect(MFE_APPS_BASE_PATH.BO).toBe('bo');
      expect(MFE_APPS_BASE_PATH.BRM).toBe('brm');
    });
  });
});
