import { mergeClassNames } from '@/app/components';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import SplitType, { TargetElement } from 'split-type';

export const SecondSection = ({
  text,
  text1,
  className,
}: {
  text: string;
  text1: string;
  className: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const chars = new SplitType(
        ref.current?.querySelector('.about_sub_line') as TargetElement
      ).chars;

      gsap.fromTo(
        chars,
        {
          opacity: 0,
          skewY: '50px',
          filter: 'blur(10px)',
        },
        {
          opacity: 1,
          skewY: 0,
          filter: 'blur(0px)',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 70%',
          },
          stagger: {
            amount: 1,
          },
        }
      );
    },
    {
      dependencies: [],
      scope: ref,
    }
  );
  return (
    <div
      className={
        'relative w-screen h-screen flex items-center justify-center about_section'
      }
      ref={ref}
    >
      <div className="w-full h-[50%] flex items-center justify-center">
        <div
          className={mergeClassNames('text-[var(--accent)] w-[70%]', className)}
        >
          <p className="text-[15px] md:text-[20px] w-fit about_sub_line">
            {text}
          </p>
          <h1 className="text-[30px] md:text-[40px] w-full">{text1}</h1>
        </div>
      </div>
    </div>
  );
};
