import { StaggerText } from 'componentopia';
import { CardWrapper } from '..';

export const About = (): JSX.Element => {
  return (
    <CardWrapper
      className={`mouse_card about_card col-span-full row-span-1 md:col-span-3 md:row-span-2 flex-col flex justify-center p-10 !text-default-accent`}
      targetClass="about"
    >
      <StaggerText
        from={{
          translateY: '100px',
        }}
        staggerAmt={0.1}
        delay={0.5}
        duration={0.5}
        styles={{
          size: 50,
        }}
        text="Hi, I'm Alister"
        scrollTrigger='about_card'
      />
    </CardWrapper>
  );
};
