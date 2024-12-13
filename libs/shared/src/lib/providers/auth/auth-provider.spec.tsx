import { render, act } from '@testing-library/react';
import { AuthProvider, useAuth } from './auth-provider';
import { useAuthStore } from '@libs/store';
import { useNavigate } from 'react-router-dom';


jest.mock('@libs/store');
jest.mock('react-router-dom');

const TestComponent = () => {
  const { isAuthenticated, login, logout } = useAuth();
  return (
    <div>
      <div data-testid='auth-status'>{isAuthenticated ? 'true' : 'false'}</div>
      <button onClick={login} data-testid='login-btn'>
        Login
      </button>
      <button onClick={logout} data-testid='logout-btn'>
        Logout
      </button>
    </div>
  );
};

describe('AuthProvider', () => {
  const mockNavigate = jest.fn();
  const mockSetAuthenticated = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      setAuthenticated: mockSetAuthenticated,
    });
  });

  it('should provides authentication context to children', () => {
    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    expect(getByTestId('auth-status')).toHaveTextContent('false');
  });

  it('should handles login correctly', () => {
    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    act(() => {
      getByTestId('login-btn').click();
    });

    expect(mockSetAuthenticated).toHaveBeenCalledWith(true);
    expect(mockNavigate).toHaveBeenCalledWith('./bo');
  });

  it('should handles logout correctly', () => {
    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    act(() => {
      getByTestId('logout-btn').click();
    });

    expect(mockSetAuthenticated).toHaveBeenCalledWith(false);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('should throws error when useAuth is used outside AuthProvider', () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useAuth must be used within an AuthProvider');

    consoleError.mockRestore();
  });
});
