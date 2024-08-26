import { mergeClassNames } from '@/app/components';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Link from 'next/link';
import { useRef } from 'react';

export const FifthSection = ({
  headerClassName,
  emailClassName,
}: {
  headerClassName: string;
  emailClassName: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 110%',
        toggleActions: 'play none none none',
      },
    });
    tl.to(ref2.current, {
      duration: 0.8,
      scale: 1,
      ease: 'elastic.out(1,0.4)',
      rotate: '-2deg',
      yoyo: true,
    });
  }, []);

  return (
    <div
      className="w-screen h-screen flex flex-col items-center justify-center about_section"
      ref={ref}
    >
      <div className="">
        <h1
          className={mergeClassNames(
            'text-[30px] md:text-[80px]',
            headerClassName
          )}
        >
          Let&apos;s connect!
        </h1>
        <Link
          href={'mailto:xavieralister153@gmail.com'}
          className={mergeClassNames(
            'px-3 inline-block -rotate-[2deg] rounded-[10px] text-[20px] md:text-[50px] scale-0',
            emailClassName
          )}
          ref={ref2}
        >
          xavieralister153@gmail.com
        </Link>
      </div>
    </div>
  );
};
