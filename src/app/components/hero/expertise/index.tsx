import { CardWrapper } from '..';
import { TextLoopVertical } from '../../animation';

export const Expertise = () => {
  return (
    <CardWrapper
      targetClass="expertise"
      className='className="hero_section col-span-4 row-span-1 md:col-span-3 md:row-span-1 p-5 bg-default-sub-bg text-default-accent'
    >
      <div className="text-default-accent">
        <h1>Expertise</h1>
      </div>
      <TextLoopVertical
        wordList={[
          'Frontend Developer',
          'Cloud Engineer',
          'DevOps Engineer',
        ]}
      />
    </CardWrapper>
  );
};
