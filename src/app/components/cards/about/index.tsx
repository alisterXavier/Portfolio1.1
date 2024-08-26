import { useInitalPageLoadedContext } from '@/app/contexts';
import { CardWrapper } from '../..';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import SplitType from 'split-type';

type StaggerTextTypes = {
  text: string;
  state?: boolean;
  from: gsap.TweenVars;
  to?: gsap.TweenVars;
  staggerAmt?: number;
  duration?: number;
  delay?: number;
  styles?: {
    fontSize?: number | string;
    color?: string;
    overflow?: 'hidden' | 'scroll' | 'visible';
  };
  scroller?: string; // Should be the identifier of the scroller
  scrollTrigger?: string; // Should be the container where the text is contained
  staggerOnScroll?: boolean; // True if letter stagger is required
  markers?: boolean;
};
export const StaggerText = ({
  text,
  state,
  styles,
  from,
  to,
  staggerAmt,
  duration,
  delay,
  scroller,
  scrollTrigger,
  staggerOnScroll,
  markers,
}: StaggerTextTypes) => {
  const ref = useRef<HTMLDivElement>(null);
  const { color, fontSize = 30, overflow = 'hidden' } = styles!;
  useGSAP(
    () => {
      const splitText = new SplitType(ref.current!);
      const chars = splitText.chars;
      const elem = document.querySelector(`.${scrollTrigger}`);
      const scrollerElem = document.querySelector(`.${scroller}`);

      gsap.fromTo(
        chars,
        {
          translateY: from.translateY,
          translateX: from.translateX,
          filter: from.filter,
          skewY: from.skewY ?? '0deg',
          skewX: from.skewX ?? '0deg',
          opacity: from.opacity,
          ease: from.ease,
        },
        {
          translateY: to?.translateY ?? 0,
          translateX: to?.translateX ?? 0,
          filter: to?.filter ?? 'blur(0px)',
          opacity: to?.opacity ?? 1,
          skewX: to?.skewX ?? '0deg',
          skewY: to?.skewY ?? '0deg',
          ease: to?.ease ?? from.ease,
          stagger: {
            amount: staggerAmt,
          },
          scrollTrigger: {
            scroller: scrollerElem,
            trigger: elem,
            start: staggerOnScroll ? 0 : 'top center',
            scrub: staggerOnScroll,
            markers: markers ?? false,
          },
          duration: duration,
          delay: delay ?? 0,
        }
      );
    },
    {
      dependencies: [ref],
      scope: ref,
      revertOnUpdate: true,
    }
  );

  return (
    <div ref={ref} className="stagger-container">
      <p
        className={`stagger ${fontSize}`}
        style={{
          color: color,
          overflow: overflow,
        }}
      >
        {text}
      </p>
    </div>
  );
};

export const About = (): JSX.Element => {
  const { state } = useInitalPageLoadedContext();
  return (
    <CardWrapper
      parentClasses="mouse_card col-span-full row-span-1 md:col-span-3 md:row-span-2"
      className={`about_card flex-col flex justify-center !text-[var(--accent)] p-10 !text-[30px] md:!text-[50px]`}
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
            fontSize: 'text-[20px] md:text-[50px]',
          }}
          text="Hi, I'm Alister"
          scrollTrigger="about_card"
        />
      )}
    </CardWrapper>
  );
};
