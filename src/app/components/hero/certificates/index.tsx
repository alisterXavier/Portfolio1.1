import { BsArrowUpRight } from 'react-icons/bs';
import { CardWrapper } from '..';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import gsap from 'gsap';

export const Certificates = (): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  
  useGSAP(
    () => {
      const textboxspan = ref.current?.querySelector('.certificate-text span');
      const textboxp = ref.current?.querySelector('.certificate-text p');
      const tl = gsap.timeline();
      const shineTL = gsap.timeline({ repeat: -1, repeatDelay: 7, paused: true });
      if (textboxspan && textboxp)
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
                shineTL.play()
              }, 1000)
            }
          });

      shineTL.fromTo(
        shineRef.current,
        {
          translateX: '-100%',
        },
        {
          translateX: '10%',
          duration: 1
        }
      );
    },
    {
      dependencies: [ref],
      scope: ref,
    }
  );

  return (
    <CardWrapper
      targetClass="certificates"
      className="mouse_card relative certificate_section certificates_container col-span-2 row-span-1 p-5"
      data-hero="certificates"
    >
      <div className="certificates flex h-full" ref={ref}>
        <div className="w-[90%] h-full flex items-center text-default-accent">
          <div className="relative certificate-text">
            <p className="text-[20px] h-fit opacity-0">
              Browse my certificates
            </p>
            <span className="h-full left-0 top-0 absolute z-10 bg-default-accent" />
          </div>
        </div>
        <div className="w-[10%] flex justify-end">
          <BsArrowUpRight
            size={20}
            className="relative z-[1] cursor-pointer text-default-accent"
          />
        </div>
      </div>
      <div className="shine" ref={shineRef}></div>
    </CardWrapper>
  );
};
