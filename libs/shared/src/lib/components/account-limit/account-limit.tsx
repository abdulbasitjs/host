import {
  Chip,
  Column,
  LargeBody,
  Row,
  SmallBody,
  XSmallBody,
} from '@kamona/components';

import { LimitDetails } from '../../typings';

interface LimitProps {
  limits: LimitDetails[];
  heading: string;
}

export function AccountLimit({ limits, heading }: LimitProps) {
  return (
    <Column className='mt-units-unit16'>
      <SmallBody
        weight='bold'
        color='primary-l1'
        className='mt-units-unit16 text-[10px] sm:text-[14px]'
      >
        {heading}
      </SmallBody>
      <Row gap='units-unit6' className='mt-units-unit16'>
        {limits.map((limit) => (
          <Column
            key={limit.chipTitle}
            className='border border-primary-l1/30 p-units-unit16 rounded-units-unit8 w-[48%]'
          >
            <Chip
              appearance={limit.color}
              label={limit.chipTitle}
              size='small'
              variant='filled'
              className={{
                root: 'w-fit',
              }}
            />
            <XSmallBody
              weight='semibold'
              color='primary-l1'
              className='mt-units-unit16'
            >
              Single {limit.chipTitle} Limit
            </XSmallBody>
            <LargeBody
              weight='bold'
              color='primary-l1'
              className='mt-units-unit8'
            >
              {limit.singleLimit}
            </LargeBody>
            <XSmallBody
              weight='semibold'
              color='primary-l1'
              className='mt-units-unit16'
            >
              Daily {limit.chipTitle} Limit
            </XSmallBody>
            <LargeBody
              weight='bold'
              color='primary-l1'
              className='mt-units-unit8'
            >
              {limit.dailyLimit}
            </LargeBody>
          </Column>
        ))}
      </Row>
    </Column>
  );
}
