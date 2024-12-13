import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from '../navbar';
import { useAuth } from '../../providers';
import { useNavigate } from 'react-router-dom';

jest.mock('../../providers');
jest.mock('react-router-dom');

describe('Navbar', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('should navigate to BO root when clicking "Open Bo App" while authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      login: jest.fn(),
      logout: jest.fn(),
    });

    render(<Navbar />);
    fireEvent.click(screen.getByText('Open Bo App'));

    expect(mockNavigate).toHaveBeenCalledWith('./bo');
  });

  it('should navigate to home when clicking "Open Bo App" while not authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      login: jest.fn(),
      logout: jest.fn(),
    });

    render(<Navbar />);
    fireEvent.click(screen.getByText('Open Bo App'));

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
