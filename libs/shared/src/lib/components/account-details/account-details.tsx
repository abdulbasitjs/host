import { Column, Image, Row } from '@kamona/components';
import { KycLevel2Icon, KycLimitIcon, KycRocketIcon } from '@libs/assets';

import { FeatureHighlight } from '../feature-highlight';
import { AccountInfo } from '../account-info';
import { AccountLimit } from '../account-limit';
import { LimitDetails } from '../../typings';

interface AccountDetailsProps {
  limits: LimitDetails[];
}

export function AccountDetails({ limits }: AccountDetailsProps) {
  return (
    <Column className='col-span-12 md:col-span-7 order-2 md:order-1 p-units-unit20 md:p-units-unit10'>
      <Row justify='center' className='hidden md:flex mt-units-unit40'>
        <Image alt='KYC Level 2' loading='lazy' src={KycLevel2Icon} />
      </Row>
      <Column className='mt-units-unit24 relative w-full sm:w-[82%] md:w-[95%] lg:w-[582px] mx-auto'>
        <Image
          alt='KYC Level 2'
          className={{
            root: 'w-full h-[480px]',
          }}
          loading='lazy'
          src={KycLimitIcon}
        />
        <FeatureHighlight
          title='WHAT YOU GET AT LEVEL 2'
          imagePath={KycRocketIcon}
          alternateText='Features'
        />
        <Column className='absolute top-[15%] left-[3%]'>
          <AccountInfo
            accountName='ACCOUNT NAME'
            businessName='Your Business name + Your Name'
          />
          <AccountLimit limits={limits} heading='UPGRADED ACCOUNT LIMITS' />
        </Column>
      </Column>
    </Column>
  );
}
