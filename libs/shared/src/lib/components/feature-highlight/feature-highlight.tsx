import { Image, Row, SmallBody } from '@kamona/components';

interface FeatureHighlightProps {
  imagePath: string;
  alternateText?: string;
  title: string;
}

export function FeatureHighlight({
  imagePath,
  alternateText = '',
  title,
}: FeatureHighlightProps) {
  return (
    <Row
      align='center'
      className={`absolute -translate-x-2/4 -translate-y-2/4 left-2/4 top-[5%]`}
    >
      <Image alt={alternateText} loading='lazy' src={imagePath} />
      <SmallBody
        weight='bold'
        color='primary-l1'
        className='text-[8px] sm:text-[10px] md:text-[12]'
      >
        {title}
      </SmallBody>
    </Row>
  );
}
