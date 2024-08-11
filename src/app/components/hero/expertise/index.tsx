import { TextLoopVertical } from 'componentopia';
import { CardWrapper } from '..';
import { useCardLoadedContext } from '@/app/contexts';

export const Expertise = () => {
  const { state } = useCardLoadedContext();
  return (
    <CardWrapper
      parentClasses="col-span-4 row-span-1 md:col-span-3 md:row-span-1 !cursor-default"
      targetClass="expertise"
      className="hero_section bg-default-sub-bg text-default-accent p-5"
    >
      <div className="text-default-accent">
        <h1>Expertise</h1>
      </div>
      {state && (
        <TextLoopVertical
          wordList={['Frontend Developer', 'Cloud Engineer', 'DevOps Engineer']}
          fontSize={30}
          color=""
          height={50}
        />
      )}
    </CardWrapper>
  );
};
