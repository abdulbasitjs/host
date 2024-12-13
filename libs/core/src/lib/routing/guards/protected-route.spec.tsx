import { render } from '@testing-library/react';
import { ProtectedRoute } from './protected-route';
import { useAuthStore } from '@libs/store';
import { MemoryRouter, useLocation } from 'react-router-dom';

jest.mock('@libs/store', () => ({
  useAuthStore: jest.fn((selector) => selector({ isAuthenticated: false })),
}));

const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid='location'>{location.pathname}</div>;
};

describe('ProtectedRoute', () => {
  it('should navigate to redirectTo when not authenticated', () => {
    (useAuthStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ isAuthenticated: false }),
    );

    const { getByTestId } = render(
      <MemoryRouter
        initialEntries={['/']}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <LocationDisplay />
        <ProtectedRoute redirectTo='/login'>
          <div>Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>,
    );

    expect(getByTestId('location')).toHaveTextContent('/login');
  });

  it('should render children if authenticated', () => {
    (useAuthStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ isAuthenticated: true }),
    );
    const { getByText } = render(
      <MemoryRouter
        initialEntries={['/']}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>,
    );
    expect(getByText('Protected Content')).toBeInTheDocument();
  });
});
