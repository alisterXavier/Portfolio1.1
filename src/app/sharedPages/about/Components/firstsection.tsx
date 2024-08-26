import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import SplitType, { TargetElement } from 'split-type';

export const HeroText = ({ className }: { className: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const container = ref.current?.querySelector('.about_name');
      const chars = new SplitType(container! as TargetElement).chars;

      const tl = gsap.timeline();
      chars?.forEach((char) => {
        char.classList.add('opacity-0');
      });
      tl.fromTo(container!, { autoAlpha: 0 }, { autoAlpha: 1 }).fromTo(
        chars,
        {
          scale: 2,
          y: -40,
          x: 40,
          // filter: 'blur(8px)',
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          x: 0,
          // filter: 'blur(0px)',
          duration: 0.5,
          ease: 'ease',
          stagger: {
            amount: 0.2,
            from: 'start',
          },
        },
        0
      );

      // gsap.fromTo(
      //   chars,
      //   {
      //     opacity: 1,
      //     autoAlpha: 1,
      //     y: 0,
      //     x: 0,
      //     filter: 'blur(0px)',
      //     scale: 1,
      //   },
      //   {
      //     opacity: 0,
      //     autoAlpha: 0,
      //     scale: 1.5,
      //     y: -40,
      //     x: 40,
      //     filter: 'blur(8px)',
      //     scrollTrigger: {
      //       trigger: '.horizontal',
      //       scrub: true,
      //       start: 'top top',
      //       end: () =>
      //         '+=' + (ref.current!.getBoundingClientRect().height - 100),
      //     },
      //     stagger: {
      //       amount: 0.5,
      //       from: 'end',
      //     },
      //   }
      // );
    },
    {
      dependencies: [ref],
      scope: ref,
    }
  );

  return (
    <div
      className={
        'relative w-screen h-screen flex items-center justify-center about_section_hero'
      }
      ref={ref}
    >
      <div className={className}>
        <p className="text-[40px] md:text-[100px] tracking-widest invisible about_name">
          Alister
        </p>
      </div>
    </div>
  );
};
