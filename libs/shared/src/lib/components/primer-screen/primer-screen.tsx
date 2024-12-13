import { KycLevel2Icon } from '@libs/assets';
import { Flex, Row } from '@kamona/components';
import { UnFile02, UnUsers02 } from '@kamona/icons-v2';

import { LevelHeader } from '../level-header';
import { AccountDetails } from '../account-details';
import { AccountProgress } from '../account-progress';
import { LimitDetails, RequirementDetails } from '../../typings';

export function Level2PrimerScreen() {
  const limits: LimitDetails[] = [
    {
      chipTitle: 'Credit' as const,
      color: 'success',
      singleLimit: '₦5,000,000.00',
      dailyLimit: '₦5,000,000.00',
    },
    {
      chipTitle: 'Debit' as const,
      color: 'danger',
      singleLimit: '₦5,000,000.00',
      dailyLimit: '₦5,000,000.00',
    },
  ];

  const requirements: RequirementDetails[] = [
    {
      label: 'NIN',
      status: 'Completed',
      color: 'success' as const,
      icon: <UnFile02 color='primary-l3' size='units-unit20' />,
    },
    {
      label: 'Next of Kin',
      status: 'Completed',
      color: 'success' as const,
      icon: <UnUsers02 color='primary-l3' size='units-unit20' />,
    },
  ];

  return (
    <Flex className='bg-wrapper grid grid-cols-12 min-h-screen'>
      <Row justify='center' className='col-span-12 md:hidden mt-units-unit40'>
        <LevelHeader imageSource={KycLevel2Icon} levelName='LEVEL 2' />
      </Row>
      <AccountDetails limits={limits} />
      <AccountProgress requirements={requirements} />
    </Flex>
  );
}
