import { useAppModeStore } from './lib/app-mode/app-mode.store';
import { useAuthStore } from './lib/auth';
import { act, renderHook } from '@testing-library/react';
describe('Store', () => {
  describe('Auth Store', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('should initialize with isAuthenticated as true (default state)', () => {
      const { result } = renderHook(() => useAuthStore());
      expect(result.current.isAuthenticated).toBe(true);
    });

    it('should set authentication state correctly', () => {
      const { result } = renderHook(() => useAuthStore());

      act(() => {
        result.current.setAuthenticated(false);
      });
      expect(result.current.isAuthenticated).toBe(false);

      act(() => {
        result.current.setAuthenticated(true);
      });
      expect(result.current.isAuthenticated).toBe(true);
    });

    it('should handle logout correctly', () => {
      const { result } = renderHook(() => useAuthStore());

      act(() => {
        result.current.logout();
      });
      expect(result.current.isAuthenticated).toBe(false);
    });

    it('should persist authentication state in localStorage', () => {
      const { result } = renderHook(() => useAuthStore());

      act(() => {
        result.current.setAuthenticated(true);
      });

      const storedState = JSON.parse(
        localStorage.getItem('auth-storage') || '{}',
      );
      expect(storedState.state.isAuthenticated).toBe(true);
    });
  });

  describe('App Mode Store', () => {
    it('should initialize with isStandalone as false (default state)', () => {
      const { result } = renderHook(() => useAppModeStore());
      expect(result.current.isStandalone).toBe(false);
    });

    it('should set isStandalone state correctly', () => {
      const { result } = renderHook(() => useAppModeStore());

      act(() => {
        result.current.setStandalone(true);
      });
      expect(result.current.isStandalone).toBe(true);
    });
  });
  
});
