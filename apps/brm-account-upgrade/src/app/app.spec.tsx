import { render } from '@testing-library/react';
import { useRemoteRouter } from '@libs/core';
import App from './app';
import { createMemoryRouter } from 'react-router-dom';

jest.mock('@libs/core', () => ({
  useRemoteRouter: jest.fn(),
  MFE_APPS_BASE_PATH: {
    BRM: 'brm',
  },
}));

describe('Brm Account Upgrade App', () => {
  beforeEach(() => {
    const mockRouter = createMemoryRouter(
      [{ path: '/', element: <div>Test</div> }],
      {
        initialEntries: ['/'],
        future: {
          v7_partialHydration: true,
          v7_normalizeFormMethod: true,
          v7_skipActionErrorRevalidation: true,
          v7_relativeSplatPath: true,
          v7_fetcherPersist: true,
        },
      },
    );

    (useRemoteRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('should renders without crashing', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });
});
