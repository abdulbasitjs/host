import { render } from '@testing-library/react';
import { LevelHeader } from './level-header';

describe('LevelHeader', () => {
  it('should render the image with correct src and alt attributes', () => {
    const levelName = 'Test Level';
    const { getByAltText } = render(
      <LevelHeader imageSource='test-image.png' levelName={levelName} />,
    );

    const image = getByAltText(levelName);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'test-image.png');
  });

  it('should render the level name correctly', () => {
    const { getByText } = render(
      <LevelHeader imageSource='test-image.png' levelName='Test Level' />,
    );

    expect(getByText('Test Level')).toBeInTheDocument();
  });
});
