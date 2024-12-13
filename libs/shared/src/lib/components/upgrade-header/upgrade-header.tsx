import { Body, LinkButton, Row } from '@kamona/components';
import { UnChevronRight } from '@kamona/icons-v2';

interface UpgradeHeaderProps {
  title : string;
  buttonText: string
}

export function UpgradeHeader({title, buttonText}: UpgradeHeaderProps) {
  return (
    <Row justify='between' align='center'>
      <Body
        weight='bold'
        color='primary-l1'
        className='text-[10px] sm:text-[14px]'
      >
        {title}
      </Body>
      <Row>
        <LinkButton
          appearance='primary'
          data-variant='visited'
          size='small'
          endIcon={<UnChevronRight />}
        >
          {buttonText}
        </LinkButton>
      </Row>
    </Row>
  );
}
