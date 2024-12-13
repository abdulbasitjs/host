import { render } from '@testing-library/react';
import { UpgradeRequirement } from './upgrade-requirement';
import { RequirementDetails } from '../../typings';

describe('UpgradeRequirement', () => {
  const mockRequirements: RequirementDetails[] = [
    {
      icon: <span>Icon1</span>,
      label: 'Requirement 1',
      status: 'Completed',
      color: 'success',
    },
    {
      icon: <span>Icon2</span>,
      label: 'Requirement 2',
      status: 'Pending',
      color: 'success',
    },
  ];

  it('should render each requirement with the correct label and status', () => {
    const { getByText } = render(
      <UpgradeRequirement requirements={mockRequirements} />,
    );

    expect(getByText('Pending')).toBeInTheDocument();
    expect(getByText('Completed')).toBeInTheDocument();
    expect(getByText('Requirement 1')).toBeInTheDocument();
    expect(getByText('Requirement 2')).toBeInTheDocument();
    expect(getByText('REQUIREMENTS FOR LEVEL 2')).toBeInTheDocument();
  });

  it('should render each requirement with the correct icon', () => {
    const { getByText } = render(
      <UpgradeRequirement requirements={mockRequirements} />,
    );

    expect(getByText('Icon1')).toBeInTheDocument();
    expect(getByText('Icon2')).toBeInTheDocument();
  });
});
