import { render, screen } from '@testing-library/react';
import { UpgradeHeader } from './upgrade-header';

describe('UpgradeHeader', () => {
  const props = {
    title: 'UPGRADE PROGRESS',
    buttonText: 'View More',
  };

  it('should render the header text correctly', () => {
    render(<UpgradeHeader {...props} />);
    const headerElement = screen.getByText(props.title);

    expect(headerElement).toBeInTheDocument();
  });

  it('should render the button text correctly', () => {
    render(<UpgradeHeader {...props} />);
    const buttonElement = screen.getByText(props.buttonText);

    expect(buttonElement).toBeInTheDocument();
  });

  it('should render the icon in the button', () => {
    const { container } = render(<UpgradeHeader {...props} />);
    const iconElement = container.querySelector('svg');

    expect(iconElement).toBeInTheDocument();
  });
});
