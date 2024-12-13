import { render } from '@testing-library/react';
import { createBrowserRouter } from 'react-router-dom';
import { App } from './app';
import { EventBus } from '@libs/shared';
import { HOST_FEDERATED_BASE_PATH } from '@libs/core';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  createBrowserRouter: jest.fn().mockReturnValue({ mockRouter: true }),
  RouterProvider: jest
    .fn()
    .mockImplementation(({ router }) => (
      <div data-testid='mock-router'>Router: {JSON.stringify(router)}</div>
    )),
}));

jest.mock('./routes', () => ({
  routes: [
    {
      path: '/',
      element: 'Mock Route',
    },
  ],
}));

jest.mock('@libs/core', () => ({
  HOST_FEDERATED_BASE_PATH: '/onboarding-v3',
}));

jest.mock('@libs/shared', () => ({
  ...jest.requireActual('@libs/shared'),
  EventBusProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='event-bus-provider'>{children}</div>
  ),
}));

describe('Host App Component', () => {
  const mockEventBus: EventBus = {
    publish: jest.fn(),
    subscribe: jest.fn(),
    unsubscribe: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create router with root basename when no eventBus provided', () => {
    render(<App />);

    expect(createBrowserRouter).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        basename: '/',
      }),
    );
  });

  it('should create router with federated basename when eventBus provided', () => {
    render(<App eventBus={mockEventBus} />);

    expect(createBrowserRouter).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        basename: HOST_FEDERATED_BASE_PATH,
      }),
    );
  });
});
