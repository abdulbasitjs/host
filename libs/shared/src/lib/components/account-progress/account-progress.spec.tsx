import { fireEvent, render } from '@testing-library/react';
import { AccountProgress } from './account-progress';
import { RequirementDetails } from '../../typings';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom');

describe('AccountProgress', () => {
  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(jest.fn());
  });

  const mockRequirements: RequirementDetails[] = [
    {
      label: 'NIN',
      status: 'Completed',
      color: 'success',
      icon: <span>Icon1</span>,
    },
  ];

  it('should render the "Continue upgrade" button', () => {
    const { getByText } = render(
      <AccountProgress requirements={mockRequirements} />,
    );
    const button = getByText('Continue upgrade');
    fireEvent.click(button);
    expect(useNavigate).toHaveBeenCalled();
  });
});
