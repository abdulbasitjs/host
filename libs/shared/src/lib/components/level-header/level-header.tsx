import { Column, Image, SmallHeader } from '@kamona/components';

interface LevelHeaderProps {
  imageSource: string;
  levelName: string;
}

export function LevelHeader({ imageSource, levelName }: LevelHeaderProps) {
  return (
    <Column className='text-center'>
      <Image
        alt={levelName}
        className={{
          root: 'size-[150px]',
        }}
        loading='lazy'
        src={imageSource}
      />
      <SmallHeader
        weight='bold'
        color='primary-l1'
        className='mt-units-unit16 text-[20px] sm:text-[25px]'
      >
        {levelName}
      </SmallHeader>
    </Column>
  );
}
