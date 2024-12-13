import { Body, Chip, Column, Row } from '@kamona/components';
import { RequirementDetails } from '../../typings';

interface UpgradeRequirementProps {
  requirements: RequirementDetails[];
}

export function UpgradeRequirement({ requirements }: UpgradeRequirementProps) {
  return (
    <Column gap='units-unit10' className='mt-units-unit20'>
      <Body
        weight='bold'
        color='primary-l1'
        className='md:mt-units-unit48 mt-units-unit24 text-[10px] sm:text-[14px]'
      >
        REQUIREMENTS FOR LEVEL 2
      </Body>
      {requirements.map((requirement, index) => (
        <Row
          align='center'
          gap='units-unit8'
          key={index}
          className='pt-units-unit20 '
        >
          <Row>{requirement.icon}</Row>
          <Body
            weight='regular'
            color='primary-l1'
            className='text-[12px] sm:text-[16px]'
          >
            {requirement.label}
          </Body>
          <Chip
            appearance={requirement.color}
            label={requirement.status}
            size='medium'
          />
        </Row>
      ))}
    </Column>
  );
}
