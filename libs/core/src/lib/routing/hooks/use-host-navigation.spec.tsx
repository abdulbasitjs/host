import { renderHook } from '@testing-library/react';
import { useHostNavigation } from './use-host-navigation';
import { useNavigate, useLocation } from 'react-router-dom';
import { EVENTS } from '../constants';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

describe('useHostNavigation', () => {
  const mockNavigate = jest.fn();
  const mockLocation = { pathname: '/app1/some-path' };
  const appName = 'app1';

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useLocation as jest.Mock).mockReturnValue(mockLocation);
    jest.clearAllMocks();
  });

  it('should not emit when pathname does not include appName', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/app2/path' });
    const dispatchEventSpy = jest.spyOn(window, 'dispatchEvent');

    renderHook(() => useHostNavigation(appName));

    expect(dispatchEventSpy).not.toHaveBeenCalled();
  });

  it('should not navigate when eventAppName does not match', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/app1/current' });
    renderHook(() => useHostNavigation(appName));

    const navigationEvent = new CustomEvent(EVENTS.ROUTING.REMOTE_NAVIGATION, {
      detail: {
        appName: 'app2',
        path: '/app1/new',
      },
    });
    window.dispatchEvent(navigationEvent);

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('should handle remote navigation events', () => {
    renderHook(() => useHostNavigation(appName));

    const navigationEvent = new CustomEvent(EVENTS.ROUTING.REMOTE_NAVIGATION, {
      detail: {
        appName: 'app1',
        path: '/app1/new-path',
      },
    });
    window.dispatchEvent(navigationEvent);

    expect(mockNavigate).toHaveBeenCalledWith('/app1/new-path');
  });

  it('should emit event only when path differs from lastEmittedPath', () => {
    const dispatchEventSpy = jest.spyOn(window, 'dispatchEvent');
    const { result } = renderHook(() => useHostNavigation('app1'));

    dispatchEventSpy.mockClear();

    result.current('/app1/path1');
    expect(dispatchEventSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: EVENTS.ROUTING.HOST_NAVIGATION,
        detail: {
          appName: 'app1',
          path: '/app1/path1',
        },
      }),
    );

    result.current('/app1/path1');
    expect(dispatchEventSpy).toHaveBeenCalledTimes(1);

    result.current('/app1/path2');
    expect(dispatchEventSpy).toHaveBeenCalledTimes(2);
  });
});
