'use client';
import { useCardContext } from '@/app/contexts';
// import img1 from '@/images/1.jpg';
// import img2 from '@/images/2.jpg';
// import img3 from '@/images/3.jpg';
// import img4 from '@/images/4.png';
// import img5 from '@/assets/Project-images/e-commerce/app_3.png';
// import img6 from '../../../../public/assets/Project-images/arcade-asylum/app_1.png';
// import img7 from '@/assets/Project-images/PAO/app_2.png';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { useRouter } from 'next/navigation';
import { ImCross } from 'react-icons/im';
import SplitType, { TargetElement } from 'split-type';
import { handleClick } from '../';
import { useEffect, useRef } from 'react';
import ReactLenis from '@studio-freight/react-lenis';

const About = () => {
  const targetClass = 'about';
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const { setState } = useCardContext();

  useGSAP(
    () => {
      let container = document.querySelector('.about_container'),
        sections = document.querySelectorAll('.about_section'),
        horizontalSections = document.querySelectorAll(
          '.about_container .about_section'
        ),
        horizontal = document.querySelectorAll('.horizontal'),
        tl = gsap.timeline({
          defaults: { duration: 1.25, ease: 'power1.inOut' },
        });
      const wrapCharsInSpan = (chars: HTMLElement[]) => {
        chars.forEach((char) => {
          const span = document.createElement('span');
          span.classList.add('char-wrapper');
          char.parentNode?.insertBefore(span, char);
          span.appendChild(char);
          span.classList.add('overflow-hidden', 'inline-block');
        });
      };
      sections.forEach((section) => {
        const splitText = new SplitType(
          section.querySelectorAll('.about_name')! as TargetElement
        ).chars;
        wrapCharsInSpan(splitText!);
        return splitText;
      });

      const onEntry = () => {
        tl.fromTo(
          sections[0].querySelectorAll('.about_name')[0],
          { autoAlpha: 0 },
          { autoAlpha: 1 }
        )
          .fromTo(
            sections[0].querySelectorAll('.about_name')[1],
            { autoAlpha: 0 },
            { autoAlpha: 1 },
            0
          )
          .fromTo(
            sections[0]
              .querySelectorAll('.about_name')[0]
              .querySelectorAll('.char'),
            {
              xPercent: 100,
              opacity: 0,
              autoAlpha: 0,
            },
            {
              xPercent: 0,
              opacity: 1,
              autoAlpha: 1,
            },
            0
          )
          .fromTo(
            sections[0]
              .querySelectorAll('.about_name')[1]
              .querySelectorAll('.char'),
            {
              yPercent: 100,
              opacity: 0,
              autoAlpha: 0,
            },
            {
              yPercent: 0,
              opacity: 1,
              autoAlpha: 1,
              duration: 0.5,
              stagger: {
                amount: 0.2,
              },
            },
            0
          );
      };
      const onExit = () => {
        tl.fromTo(
          sections[0]
            .querySelectorAll('.about_name')[0]
            .querySelectorAll('.char'),
          { xPercent: 0, opacity: 1, autoAlpha: 1 },
          {
            xPercent: -100,
            opacity: 0,
            autoAlpha: 0,
            scrollTrigger: {
              trigger: horizontal,
              scrub: true,
              start: 'top 100',
              end: () => '+=' + sections[0].getBoundingClientRect().width,
            },
          }
        ).fromTo(
          sections[0]
            .querySelectorAll('.about_name')[1]
            .querySelectorAll('.char'),
          { opacity: 1, autoAlpha: 1 },
          {
            opacity: 0,
            autoAlpha: 0,
            scrollTrigger: {
              trigger: horizontal,
              scrub: true,
              start: 'top 100',
              end: () => '+=' + sections[0].getBoundingClientRect().width,
            },
            duration: 0.2,
            stagger: {
              amount: 1,
              from: 'end',
            },
          },
          0
        );
        // .fromTo(
        //   container?.querySelector('.about_section_wrapper')!,
        //   {
        //     xPercent: 0,
        //   },
        //   {
        //     xPercent: -100,
        //     scrollTrigger: {
        //       trigger: horizontal,
        //       scrub: true,
        //       start: 'top',
        //       end: () =>
        //         '+=' + document.querySelector('.about_container')!.clientWidth,
        //     },
        //   }
        // );
      };

      onEntry();
      onExit();

      const enableHorizontalScroll = () => {
        gsap.to(horizontalSections, {
          xPercent: -100 * (horizontalSections.length - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: horizontal,
            pin: true,
            start: 'top top',
            scrub: true,
            end: () => '+=' + container!.getBoundingClientRect().width,
          },
        });
      };
      enableHorizontalScroll();
    },
    {
      dependencies: [],
      scope: '.about_container',
    }
  );

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        // duration: 0.5,
        syncTouch: true,
      }}
    >
      <div>
        <div
          className="about_container horizontal bg-default-bg flex flex-nowrap w-[300vw]"
          ref={ref}
        >
          <ImCross
            size={30}
            className="absolute top-10 right-10"
            color="white"
            onClick={() => {
              handleClick({ setState, targetClass, router });
            }}
          />
          <div className="relative w-screen h-screen flex items-center justify-center about_section">
            <div className="!text-default-accent overflow-hidden">
              <p className="text-[40px] md:text-[100px] tracking-widest about_name invisible">
                Typewriter
              </p>
              <p className="text-[20px] about_name invisible">
                Elevating Digital Solutions: Where Frontend Meets the Cloud
              </p>
            </div>
          </div>
          <div className="about_section_wrapper w-auto flex">
            <div className="relative w-screen h-screen flex items-center justify-center about_section flex-col">
              <div className="bg-default-accent w-full h-[50%] flex items-center justify-center text-default-sub-bg">
                <div className="text-default-bg w-[70%]">
                  <p className="text-[20px] w-full">
                    Transforming Visions into Cloud Realities
                  </p>
                  <h1 className="text-[40px] w-full">Cloud Engineer</h1>
                </div>
              </div>
              <div className="bg-default-sub-bg w-full h-[50%] flex items-center justify-center flex-col">
                <div className="text-default-accent w-[70%]">
                  <p className="text-[20px] w-full">
                    Crafting Digital Experiences, One Line at a Time
                  </p>
                  <h1 className="text-[40px] w-full">Front End Developer</h1>
                </div>
              </div>
            </div>
            <div className="relative w-screen h-screen flex items-center justify-center about_section flex-col">
              <div className="bg-default-accent w-full h-[50%] flex items-center justify-center text-default-sub-bg">
                <div className="text-default-bg w-[70%]">
                  <p className="text-[20px] w-full">
                    Transforming Visions into Cloud Realities
                  </p>
                  <h1 className="text-[40px] w-full">Cloud Engineer</h1>
                </div>
              </div>
              <div className="bg-default-sub-bg w-full h-[50%] flex items-center justify-center flex-col">
                <div className="text-default-accent w-[70%]">
                  <p className="text-[20px] w-full">
                    Crafting Digital Experiences, One Line at a Time
                  </p>
                  <h1 className="text-[40px] w-full">Front End Developer</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ReactLenis>
  );
};

export default About;
