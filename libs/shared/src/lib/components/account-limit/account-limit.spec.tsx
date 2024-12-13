import { render } from '@testing-library/react';
import { AccountLimit } from './account-limit';
import { LimitDetails } from '../../typings';

describe('AccountLimit', () => {
  const mockLimits: LimitDetails[] = [
    {
      chipTitle: 'Credit',
      color: 'success',
      singleLimit: '100',
      dailyLimit: '500',
    },
    {
      chipTitle: 'Debit',
      color: 'danger',
      singleLimit: '200',
      dailyLimit: '1000',
    },
  ];

  it('should render heading and account credit and debit limits correctly', () => {
    const { getByText } = render(
      <AccountLimit limits={mockLimits} heading='Account Limits' />,
    );

    expect(getByText('Account Limits')).toBeInTheDocument();

    expect(getByText('Credit')).toBeInTheDocument();
    expect(getByText('Single Credit Limit')).toBeInTheDocument();
    expect(getByText('100')).toBeInTheDocument();
    expect(getByText('Daily Credit Limit')).toBeInTheDocument();
    expect(getByText('500')).toBeInTheDocument();

    expect(getByText('Debit')).toBeInTheDocument();
    expect(getByText('Single Debit Limit')).toBeInTheDocument();
    expect(getByText('200')).toBeInTheDocument();
    expect(getByText('Daily Debit Limit')).toBeInTheDocument();
    expect(getByText('1000')).toBeInTheDocument();
  });
});
