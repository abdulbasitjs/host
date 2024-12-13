import { render } from '@testing-library/react';
import { AccountInfo } from './account-info';

describe('AccountInfo', () => {
  it('should render account information (accountName and businessName)', () => {
    const { getByText } = render(
      <AccountInfo accountName='John Doe' businessName='Doe Enterprises' />,
    );

    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByText('Doe Enterprises')).toBeInTheDocument();
  });
});
