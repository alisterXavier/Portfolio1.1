import { CardWrapper } from '..';

export const Work = (): JSX.Element => {
  return (
    <CardWrapper
      targetClass="work"
      className="hero_section mouse_card row-span-2 col-span-4 md:row-span-2 md:col-span-2 relative"
    >
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <div className=" w-[90%] relative z-0 text-[65px] text-default-accent space-bold items-center justify-center">
          <h1 className="text-[250px] text-default-sub-bg z-[1] absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] after:content-['3'] after:absolute after:text-default-accent after:left-0 after:text-[251px] after:z-[-1]">
            3
          </h1>
          <p className="relative leading-[55px] uppercase">
            Years of
          </p>
          <p className="relative z-[1] leading-[55px] uppercase">
            experience
          </p>
          <p className="relative leading-[55px] uppercase">
            in building
          </p>
          <p className="relative z-[1] leading-[55px] uppercase">
            stuff
          </p>
        </div>
      </div>
    </CardWrapper>
  );
};
