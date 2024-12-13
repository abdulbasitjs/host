import { renderHook } from '@testing-library/react';
import { useRemoteNavigation } from './use-remote-navigation';
import { EVENTS } from '../constants';

describe('useRemoteNavigation', () => {
  const appName = 'app1';
  const mockOnPathChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not emit duplicate navigation events', () => {
    const dispatchEventSpy = jest.spyOn(window, 'dispatchEvent');
    const { result } = renderHook(() =>
      useRemoteNavigation(appName, mockOnPathChange),
    );

    result.current('/path');
    result.current('/path');

    expect(dispatchEventSpy).toHaveBeenCalledTimes(1);
  });

  it('should handle root path correctly', () => {
    renderHook(() => useRemoteNavigation(appName, mockOnPathChange));

    const event = new CustomEvent(EVENTS.ROUTING.HOST_NAVIGATION, {
      detail: {
        appName: 'app1',
        path: '/app1',
      },
    });
    window.dispatchEvent(event);

    expect(mockOnPathChange).toHaveBeenCalledWith('/');
  });

  it('should handle host navigation event conditions', () => {
    const mockOnPathChange = jest.fn();
    const appName = 'app1';

    renderHook(() => useRemoteNavigation(appName, mockOnPathChange));

    window.dispatchEvent(
      new CustomEvent(EVENTS.ROUTING.HOST_NAVIGATION, {
        detail: {
          appName: 'app1',
          path: '/app1/path1',
        },
      }),
    );
    expect(mockOnPathChange).toHaveBeenCalledWith('/path1');
    mockOnPathChange.mockReset();

    window.dispatchEvent(
      new CustomEvent(EVENTS.ROUTING.HOST_NAVIGATION, {
        detail: {
          appName: 'app2',
          path: '/app2/path2',
        },
      }),
    );
    expect(mockOnPathChange).not.toHaveBeenCalled();
  });

  it('should handle path changes and lastEmittedPath comparison', () => {
    const mockOnPathChange = jest.fn();
    const appName = 'app1';

    const { result } = renderHook(() =>
      useRemoteNavigation(appName, mockOnPathChange),
    );

    result.current('/some-path');

    window.dispatchEvent(
      new CustomEvent(EVENTS.ROUTING.HOST_NAVIGATION, {
        detail: {
          appName: 'app1',
          path: '/app1/some-path',
        },
      }),
    );

    expect(mockOnPathChange).not.toHaveBeenCalled();

    window.dispatchEvent(
      new CustomEvent(EVENTS.ROUTING.HOST_NAVIGATION, {
        detail: {
          appName: 'app1',
          path: '/app1/different-path',
        },
      }),
    );

    expect(mockOnPathChange).toHaveBeenCalledWith('/different-path');
  });
});
