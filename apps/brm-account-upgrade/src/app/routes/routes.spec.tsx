import { render, screen, fireEvent } from '@testing-library/react';
import {
  Level2Component,
  Level3Component,
  RootComponent,
} from './routes';

// Add this mock before the tests
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Router Components', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('should render root component and trigger navigation to level 2', () => {
    render(<RootComponent />);
    const level1Button = screen.getByText('BRM Level 1');
    fireEvent.click(level1Button);
    expect(mockNavigate).toHaveBeenCalledWith('/kyc-lvl2');
  });

  it('should render level 2 component and trigger navigation to level 3', () => {
    render(<Level2Component />);
    const level2Button = screen.getByText('BRM Level 2');
    fireEvent.click(level2Button);
    expect(mockNavigate).toHaveBeenCalledWith('/kyc-lvl3');
  });

  it('should render level 3 component and trigger navigation to root', () => {
    render(<Level3Component />);
    const level3Button = screen.getByText('BRM Level 3');
    fireEvent.click(level3Button);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
