import { render } from '@testing-library/react';
import { AccountDetails } from './account-details';
import { LimitDetails } from '../../typings';
import { KycLevel2Icon, KycLimitIcon } from '@libs/assets';

describe('AccountDetails', () => {
  const mockLimits: LimitDetails[] = [
    {
      chipTitle: 'Credit',
      color: 'success',
      singleLimit: '₦5,000,000.00',
      dailyLimit: '₦5,000,000.00',
    }
  ];

  it('should render KYC level and limit images', () => {
    const { getAllByAltText } = render(<AccountDetails limits={mockLimits} />);

    const kycLevel2Images = getAllByAltText('KYC Level 2');
    expect(kycLevel2Images[0]).toHaveAttribute('src', KycLevel2Icon);
    expect(kycLevel2Images[1]).toHaveAttribute('src', KycLimitIcon);
  });
});
