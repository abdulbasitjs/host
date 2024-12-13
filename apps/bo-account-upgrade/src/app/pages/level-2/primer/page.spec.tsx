import { render, screen } from '@testing-library/react';
import BOLevel2Primer from './page';

jest.mock('@libs/shared', () => ({
  Level2PrimerScreen: () => (
    <div data-testid='level-2-primer-screen'>Mock Level 2 Primer Screen</div>
  ),
}));

describe('BO Level 2 Primer', () => {
  it('should render the level 2 primer page', () => {
    const { container } = render(<BOLevel2Primer />);
    expect(container).toBeInTheDocument();
    expect(screen.getByTestId('level-2-primer-screen')).toBeInTheDocument();
  });
});
