import { CardWrapper } from '../..';

export const Work = (): JSX.Element => {
  return (
    <CardWrapper
      parentClasses="mouse_card row-span-2 col-span-4 md:row-span-2 md:col-span-2"
      targetClass="work"
      className="hero_section relative"
    >
      <div className="relativew-full h-full overflow-hidden flex items-center justify-center p-5">
        <div className="w-full h-full relative z-0 text-[40px] md:text-[65px] text-[var(--accent)] space-bold flex flex-col justify-center text-center">
          <h1 className="text-[250px] text-[var(--sub)] z-[1] absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] after:content-['2'] after:absolute after:text-[var(--accent)] after:left-0 after:text-[251px] md:after:text-[251px] after:z-[-1]">
            2
          </h1>
          <p className="text-[90%] relative leading-[40px] md:leading-[55px] uppercase">Years of</p>
          <p className="text-[90%] relative z-[1] leading-[40px] md:leading-[55px] uppercase">experience</p>
          <p className="text-[90%] relative leading-[40px] md:leading-[55px] uppercase">in building</p>
          <p className="text-[90%] relative z-[1] leading-[40px] md:leading-[55px] uppercase">stuff</p>
        </div>
      </div>
    </CardWrapper>
  );
};
