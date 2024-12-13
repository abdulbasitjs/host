import { UnArrowRight } from '@kamona/icons-v2';
import { Button, Column, Row } from '@kamona/components';

import { ProgressBar } from '../progress-bar';
import { UpgradeRequirement } from '../upgrade-requirement';
import { UpgradeHeader } from '../upgrade-header';
import { RequirementDetails } from '../../typings';
import { useNavigate } from 'react-router-dom';

interface AccountProgressProps {
  requirements: RequirementDetails[];
}

export function AccountProgress({ requirements }: AccountProgressProps) {
  const navigate = useNavigate();
  return (
    <Column className='col-span-12 md:col-span-5 order-1 md:order-2 bg-neutral-black/30 p-units-unit4 md:w-[100%] w-[80%] mx-auto mt-units-unit48 md:mt-[0]'>
      <Column className='mx-auto w-[80%] md:mt-[219px] py-units-unit24'>
        <UpgradeHeader title='UPGRADE PROGRESS' buttonText='View More' />
        <ProgressBar />
        <Row className='md:mt-units-unit48 mt-units-unit24 border-t-[1px] border border-primary-l1/20'></Row>
        <UpgradeRequirement requirements={requirements} />
        <Row
          justify='center'
          className='py-units-unit32 md:mt-units-unit96 mt-units-unit4 px-units-unit16'
        >
          <Button
            appearance='plain'
            endIcon={<UnArrowRight />}
            onClick={() => {
              navigate('./kyc-lvl3');
            }}
            size='medium'
            className={{
              root: 'justify-center',
            }}
            block
          >
            Continue upgrade
          </Button>
        </Row>
      </Column>
    </Column>
  );
}
