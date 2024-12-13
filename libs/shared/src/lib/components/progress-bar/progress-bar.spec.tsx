import { render, screen } from '@testing-library/react';
import { ProgressBar } from './progress-bar';

describe('ProgressBar', () => {
  it('should render all level labels correctly', () => {
    const { getByText } = render(<ProgressBar />);

    const levels = ['Lvl 1', 'Lvl 2', 'Lvl 3', 'Registered', 'Registered+'];
    const levelElements = levels.map((level) => getByText(level));

    levelElements.forEach((element, index) => {
      expect(element).toBeInTheDocument();
      expect(element.textContent).toBe(levels[index]);
    });
  });
});
