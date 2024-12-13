import { render } from '@testing-library/react';
import { Level2PrimerScreen } from './primer-screen';
import { BrowserRouter } from 'react-router-dom';

describe('Level2PrimerScreen', () => {
  it('should render successfully', () => {
    const { container } = render(
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Level2PrimerScreen />
      </BrowserRouter>,
    );
    expect(container).toBeInTheDocument();
  });
});
