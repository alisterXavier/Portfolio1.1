import { useInitalPageLoadedContext } from '@/app/contexts';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import { BsArrowUpRight } from 'react-icons/bs';
import { CardWrapper } from '../..';

export const Certificates = (): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const { state } = useInitalPageLoadedContext();

  useGSAP(
    () => {
      if (!state) return;

      const textboxspan = ref.current?.querySelector('.certificate-text span');
      const textboxp = ref.current?.querySelector('.certificate-text p');
      
      if (!textboxspan || !textboxp) return;
      
      const tl = gsap.timeline();
      const shineTL = gsap.timeline({
        repeat: -1,
        repeatDelay: 7,
        paused: true,
      });
      tl.from(textboxspan, {
        left: '0%',
        right: '100%',
      })
        .to(textboxspan, {
          left: '0%',
          right: '0%',
          ease: 'power.in',
        })
        .to(textboxp, {
          opacity: 1,
        })
        .to(textboxspan, {
          left: '100%',
          right: 0,
          ease: 'power.out',
          onComplete: () => {
            setTimeout(() => {
              shineTL.play();
            }, 1000);
          },
        });

      shineTL.fromTo(
        shineRef.current,
        {
          translateX: '-100%',
        },
        {
          translateX: '10%',
          duration: 1,
        }
      );
    },
    {
      dependencies: [ref, state],
      scope: ref,
    }
  );

  return (
    <CardWrapper
      parentClasses="mouse_card col-span-3 md:col-span-2 row-span-1"
      targetClass="certificates"
      className="relative certificate_section certificates_container p-5"
      data-hero="certificates"
    >
      <div className="certificates flex h-full" ref={ref}>
        <div className="w-[90%] h-full flex items-center text-[var(--accent)]">
          <div className="relative certificate-text">
            <p className="text-[20px] h-fit opacity-0">
              Browse my certificates
            </p>
            <span className="h-full left-0 top-0 absolute z-10 bg-[var(--accent)]" />
          </div>
        </div>
        <div className="w-[10%] flex justify-end">
          <BsArrowUpRight
            size={20}
            className="relative z-[1] cursor-pointer text-[var(--accent)]"
          />
        </div>
      </div>
      <div className="shine" ref={shineRef}></div>
    </CardWrapper>
  );
};