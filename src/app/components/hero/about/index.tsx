import { useCardLoadedContext } from '@/app/contexts';
import { StaggerText } from 'componentopia';
import { CardWrapper } from '..';

export const About = (): JSX.Element => {
  const { state } = useCardLoadedContext();
  return (
    <CardWrapper
      parentClasses="mouse_card col-span-full row-span-1 md:col-span-3 md:row-span-2"
      className={`about_card flex-col flex justify-center !text-default-accent p-10 !text-[30px] md:!text-[50px]`}
      targetClass="about"
    >
      {state && (
        <StaggerText
          from={{
            translateY: '100px',
          }}
          staggerAmt={0.1}
          delay={0.1}
          duration={0.5}
          styles={{
            size: 50,
          }}
          text="Hi, I'm Alister"
          scrollTrigger="about_card"
        />
      )}
    </CardWrapper>
  );
};
