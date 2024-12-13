import { render } from '@testing-library/react';
import { RootLayout } from './layout';
import { useAuth } from '../providers';
import { useNavigate } from 'react-router-dom';

jest.mock('../providers');
jest.mock('react-router-dom');

describe('RootLayout', () => {
  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(jest.fn());
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      login: jest.fn(),
      logout: jest.fn(),
    });
  });

  it('should render successfully', () => {
    const { container } = render(<RootLayout />);
    expect(container).toBeInTheDocument();
  });
});
