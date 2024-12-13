import { render } from '@testing-library/react';
import { InfoBanner } from './info-banner';

describe('InfoBanner', () => {
  it('should render the message correctly', () => {
    const { getByText } = render(
      <InfoBanner message='This is an info message' bannerType='info' />,
    );

    expect(getByText('This is an info message')).toBeInTheDocument();
  });

  it('should apply the correct class for info type', () => {
    const { container } = render(
      <InfoBanner message='Info message' bannerType='info' />,
    );

    expect(container.firstChild).toHaveClass('bg-[#F08922]/30');
  });

  it('should apply the correct class for error type', () => {
    const { container } = render(
      <InfoBanner message='Error message' bannerType='error' />,
    );

    expect(container.firstChild).toHaveClass('bg-[#E94444]/40');
  });

  it('should not apply a background class for neutral type', () => {
    const { container } = render(
      <InfoBanner message='Neutral message' bannerType='neutral' />,
    );

    expect(container.firstChild).not.toHaveClass('bg-[#F08922]/30');
    expect(container.firstChild).not.toHaveClass('bg-[#E94444]/40');
  });

  it('should render the icon if provided', () => {
    const { getByTestId } = render(
      <InfoBanner
        message='Message with icon'
        bannerType='info'
        icon={<div data-testid='icon'>Icon</div>}
      />,
    );

    expect(getByTestId('icon')).toBeInTheDocument();
  });

  it('should not render an icon if not provided', () => {
    const { queryByTestId } = render(
      <InfoBanner message='Message without icon' bannerType='info' />,
    );

    expect(queryByTestId('icon')).not.toBeInTheDocument();
  });
});
