import { render, screen } from '@testing-library/react';
import { routes } from './routes';
import { MFE_APPS_BASE_PATH } from '@libs/core';
import { MemoryRouter, Navigate } from 'react-router-dom';
import { MFAppWrapper } from '../components/mfe-app-wrapper';
import { Suspense } from 'react';

jest.mock('boApp/Module');
jest.mock('brmApp/Module');

jest.mock('@libs/core', () => ({
  MFE_APPS_BASE_PATH: {
    BO: 'bo',
    BRM: 'brm',
  },
  useHostNavigation: () => jest.fn(),
}));

describe('Routes Configuration', () => {
  const [rootRoute] = routes;

  const renderRoute = (route: React.ReactNode) => {
    return render(
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        {route}
      </MemoryRouter>,
    );
  };

  it('should render BO route with loading state and content', async () => {
    const boRoute = rootRoute.children?.find(
      (route) => route.path === `/${MFE_APPS_BASE_PATH.BO}/*`,
    );

    renderRoute(boRoute?.element);
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    const boApp = await screen.findByTestId('mock-bo-app');
    expect(boApp).toBeInTheDocument();
  });

  it('should render BRM route with loading state and content', async () => {
    const brmRoute = rootRoute.children?.find(
      (route) => route.path === `/${MFE_APPS_BASE_PATH.BRM}/*`,
    );

    renderRoute(brmRoute?.element);
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    const brmApp = await screen.findByTestId('mock-brm-app');
    expect(brmApp).toBeInTheDocument();
  });

  it('should have default route redirecting to BO', () => {
    const defaultRoute = rootRoute.children?.find(
      (route) => route.path === '/',
    );
    expect(defaultRoute?.element.type).toBe(Navigate);
    expect(defaultRoute?.element.props).toEqual({
      to: `/${MFE_APPS_BASE_PATH.BO}`,
      replace: true,
    });
  });

  it('should throw error when MFAppWrapper receives unknown app name', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => {
      render(
        <MemoryRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <MFAppWrapper appName='unknown-app' />
          </Suspense>
        </MemoryRouter>,
      );
    }).toThrow('Unknown MFE: unknown-app');

    consoleSpy.mockRestore();
  });
});
