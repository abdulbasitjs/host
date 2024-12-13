import { Row, SmallBody } from '@kamona/components';

const levels = ['Lvl 1', 'Lvl 2', 'Lvl 3', 'Registered', 'Registered+'];

export function ProgressBar() {
  return (
    <>
      <Row className='gap-units-unit2 mt-units-unit20'>
        {levels.map((_, index) => (
          <Row
            key={`progress-segment-${index}`}
            grow
            className='h-units-unit4 bg-[#1B97DB]/30'
          ></Row>
        ))}
      </Row>
      <Row justify='between' className='mt-units-unit20 text-primary-l1/50'>
        {levels.map((level, index) => (
          <SmallBody
            key={`progress-label-${index}`}
            weight='semibold'
            className='text-[0.625rem]'
          >
            {level}
          </SmallBody>
        ))}
      </Row>
    </>
  );
}
