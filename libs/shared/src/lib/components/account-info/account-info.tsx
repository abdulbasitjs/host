import { Column, Header, SmallBody } from '@kamona/components';
import { UnInfoCircle } from '@kamona/icons-v2';

import { InfoBanner } from '../info-banner';

interface AccountInfoProps {
  accountName: string;
  businessName: string;
}

export function AccountInfo({ accountName, businessName }: AccountInfoProps) {
  return (
    <>
      <SmallBody
        weight='bold'
        color='primary-l1'
        className='text-[10px] sm:text-[14px]'
      >
        {accountName}
      </SmallBody>
      <Column className='mt-units-unit16 border-primary-l1/30 p-units-unit14 border-[1px] rounded-units-unit8 w-[97%]'>
        <Header
          weight='bold'
          color='primary-l1'
          className='min-h-units-unit64 text-[20px] sm:text-[25px]'
        >
          {businessName}
        </Header>
        <Column className=' border-primary-l1/30 mt-units-unit10 border-t-[1px]'>
          <Column className='pt-units-unit10'>
            <InfoBanner
              message='You are currently on LEVEL 2. Some documents require your attention before you can level up.'
              bannerType='neutral'
              icon={<UnInfoCircle color='primary-l1' />}
            />
          </Column>
        </Column>
      </Column>
    </>
  );
}
