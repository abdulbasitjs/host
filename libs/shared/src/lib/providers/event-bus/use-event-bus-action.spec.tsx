import { renderHook } from '@testing-library/react';
import { useEventBusAction } from './use-event-bus-action';

jest.mock('./event-bus-provider', () => ({
  useEventBus: jest.fn(),
  EventBusProvider: ({ children }: { children: React.ReactNode }) => children,
}));

const mockedUseEventBus = jest.mocked(
  require('./event-bus-provider').useEventBus,
);

const mockEventBus = {
  publish: jest.fn(),
  subscribe: jest.fn(),
  unsubscribe: jest.fn(),
};

describe('useEventBusAction', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('emitToHost', () => {
    it('should publish event with payload when eventBus is available', () => {
      mockedUseEventBus.mockReturnValue(mockEventBus);

      const { result } = renderHook(() => useEventBusAction());
      const event = 'TEST_EVENT';
      const payload = { data: 'test' };

      result.current.emitToHost(`host:${event}`, payload);

      expect(result.current.isConnected).toBe(true);
      expect(mockEventBus.publish).toHaveBeenCalledWith(
        `host:${event}`,
        payload,
      );
    });

    it('should log warning when eventBus is not available', () => {
      mockedUseEventBus.mockReturnValue(null);

      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      const { result } = renderHook(() => useEventBusAction());
      const event = 'TEST_EVENT';

      result.current.emitToHost(`host:${event}`);

      expect(result.current.isConnected).toBe(false);
      expect(consoleSpy).toHaveBeenCalledWith(
        `Failed to emit host:${event}: EventBus not available`,
      );
      consoleSpy.mockRestore();
    });
  });

  describe('subscribeToHost', () => {
    it('should subscribe to event and return unsubscribe function when eventBus is available', () => {
      mockedUseEventBus.mockReturnValue(mockEventBus);

      const { result } = renderHook(() => useEventBusAction());
      const event = 'TEST_EVENT';
      const callback = jest.fn();

      const unsubscribe = result.current.subscribeToHost(
        `host:${event}`,
        callback,
      );

      expect(mockEventBus.subscribe).toHaveBeenCalledWith(
        `host:${event}`,
        callback,
      );
      expect(result.current.isConnected).toBe(true);

      unsubscribe();
      expect(mockEventBus.unsubscribe).toHaveBeenCalledWith(
        `host:${event}`,
        callback,
      );
    });

    it('should log warning and return noop when eventBus is not available', () => {
      mockedUseEventBus.mockReturnValue(null);

      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      const { result } = renderHook(() => useEventBusAction());
      const event = 'TEST_EVENT';
      const callback = jest.fn();

      const unsubscribe = result.current.subscribeToHost(
        `host:${event}`,
        callback,
      );

      expect(result.current.isConnected).toBe(false);
      expect(consoleSpy).toHaveBeenCalledWith(
        `Failed to subscribe to host:${event}: EventBus not available`,
      );
      const res = unsubscribe();
      expect(res).toBe(0);
      consoleSpy.mockRestore();
    });
  });
});
