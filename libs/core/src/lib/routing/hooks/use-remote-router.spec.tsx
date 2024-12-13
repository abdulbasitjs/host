import { renderHook } from '@testing-library/react';
import { useRemoteRouter } from './use-remote-router';
import * as remoteNavigation from './use-remote-navigation';
import { createMemoryRouter, createBrowserRouter } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  createMemoryRouter: jest.fn(),
  createBrowserRouter: jest.fn(),
}));

jest.mock('./use-remote-navigation', () => ({
  useRemoteNavigation: jest.fn(),
}));

describe('useRemoteRouter', () => {
  const mockRoutes = [{ path: '/' }];
  const mockNavigate = jest.fn();
  const mockEmitNavigation = jest.fn();
  const unsubscribe = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    const mockRouter = {
      navigate: mockNavigate,
      subscribe: jest.fn((callback) => {
        callback({ location: { pathname: '/test' } });
        return unsubscribe;
      }),
    };

    (createMemoryRouter as jest.Mock).mockReturnValue(mockRouter);
    (createBrowserRouter as jest.Mock).mockReturnValue(mockRouter);
    (remoteNavigation.useRemoteNavigation as jest.Mock).mockReturnValue(
      mockEmitNavigation,
    );
  });

  it('should cleanup subscription on unmount', () => {
    const { unmount } = renderHook(() =>
      useRemoteRouter({
        isStandAlone: false,
        routes: mockRoutes,
        appName: 'test-app',
      }),
    );

    unmount();
    expect(unsubscribe).toHaveBeenCalled();
  });

  it('should cater the isStandAlone flag for router type and navigation', () => {
    const mockNavigate = jest.fn();
    const mockEmitNavigation = jest.fn();

    const mockRouter = {
      navigate: mockNavigate,
      subscribe: jest.fn(() => jest.fn()),
    };

    (createMemoryRouter as jest.Mock).mockReturnValue(mockRouter);
    (createBrowserRouter as jest.Mock).mockReturnValue(mockRouter);
    (remoteNavigation.useRemoteNavigation as jest.Mock).mockReturnValue(
      mockEmitNavigation,
    );

    renderHook(() =>
      useRemoteRouter({
        routes: [{ path: '/' }],
        appName: 'test-app',
      }),
    );

    expect(createMemoryRouter).toHaveBeenCalled();
    expect(createBrowserRouter).not.toHaveBeenCalled();

    const navigationCallback = (
      remoteNavigation.useRemoteNavigation as jest.Mock
    ).mock.calls[0][1];
    navigationCallback('/test-path');
    expect(mockNavigate).toHaveBeenCalledWith('/test-path');
  });

  it('should conditionally call router.navigate based on isStandAlone', () => {
    const mockNavigate = jest.fn();
    const mockRouter = {
      navigate: mockNavigate,
      subscribe: jest.fn(() => jest.fn()),
    };

    (createMemoryRouter as jest.Mock).mockReturnValue(mockRouter);
    (createBrowserRouter as jest.Mock).mockReturnValue(mockRouter);
    (remoteNavigation.useRemoteNavigation as jest.Mock).mockImplementation(
      (_, callback) => {
        callback('/test-path');
        return jest.fn();
      },
    );

    renderHook(() =>
      useRemoteRouter({
        isStandAlone: false,
        routes: [{ path: '/' }],
        appName: 'test-app',
      }),
    );
    expect(mockNavigate).toHaveBeenCalledWith('/test-path');

    mockNavigate.mockClear();

    renderHook(() =>
      useRemoteRouter({
        isStandAlone: true,
        routes: [{ path: '/' }],
        appName: 'test-app',
      }),
    );
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
