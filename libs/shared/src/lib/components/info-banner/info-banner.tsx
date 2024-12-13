import { Row, SmallBody } from '@kamona/components';
import { ReactNode } from 'react';
import clsx from 'clsx';

type BannerType = 'info' | 'error' | 'neutral';

interface InfoBannerProps {
  message: string;
  bannerType: BannerType;
  icon?: ReactNode;
}

export function InfoBanner({ message, bannerType, icon }: InfoBannerProps) {
  const backgroundClass = clsx({
    'bg-[#F08922]/30': bannerType === 'info',
    'bg-[#E94444]/40': bannerType === 'error',
  });

  return (
    <Row
      gapX='units-unit6'
      className={clsx('p-units-unit8 rounded-units-unit4', backgroundClass)}
    >
      {icon && <Row>{icon}</Row>}
      <SmallBody
        weight='semibold'
        color='primary-l1'
        className='text-[10px] sm:text-[13px]'
      >
        {message}
      </SmallBody>
    </Row>
  );
}
