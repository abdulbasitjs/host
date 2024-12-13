import { render, screen } from '@testing-library/react';
import { FeatureHighlight } from './feature-highlight';

describe('FeatureHighlight Component', () => {
  const props = {
    imagePath: '/test-image.png',
    alternateText: 'Test Alt Text',
    title: 'Test Title',
  };

  it('should render with provided props', () => {
    render(<FeatureHighlight {...props} />);
    
    const imageElement = screen.getByAltText(/test alt text/i);
    const titleElement = screen.getByText(/test title/i);

    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', props.imagePath);
    expect(imageElement).toHaveAttribute('alt', props.alternateText);
    expect(titleElement).toBeInTheDocument();
  });

  it('should use an empty string as default alternateText when not provided', () => {
    render(<FeatureHighlight imagePath='/test-image.png' title='Test Title' />);
    
    const imageElement = screen.getByAltText('');
    
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', '/test-image.png');
    expect(imageElement).toHaveAttribute('alt', '');
  });
});
