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
import ReactLenis from '@studio-freight/react-lenis';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ImCross } from 'react-icons/im';
import SplitType, { TargetElement } from 'split-type';
import { handleClick } from '../';

const Mask = () => {
  const [inside, setInside] = useState(false);
  const [toggle, setToggle] = useState(false);
  const delayedEffect = useRef({
    x: 0,
    y: 0,
  });
  const mouse = useRef({
    x: 0,
    y: 0,
  });
  const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

  const moveCircle = (x: number, y: number) => {
    gsap.set('.mask', {
      maskPosition: `${x}px ${y}px`,
    });
  };

  useEffect(() => {
    const animate = () => {
      const { x, y } = delayedEffect.current;
      delayedEffect.current = {
        x: lerp(x, mouse.current.x, 0.08),
        y: lerp(y, mouse.current.y, 0.08),
      };
      moveCircle(delayedEffect.current.x, delayedEffect.current.y);
      window.requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { scrollX, scrollY } = window;
      mouse.current = {
        x: clientX + scrollX,
        y: clientY + scrollY,
      };
      setInside(true);
      moveCircle(mouse.current.x, mouse.current.y);
    };

    const handleMouseClick = (e: MouseEvent) => {
      setToggle((prev) => !prev);
    };

    const addEventListeners = () => {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('click', handleMouseClick);
    };

    const removeEventListeners = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleMouseClick);
    };

    animate();
    addEventListeners();

    return () => {
      removeEventListeners();
    };
  }, []);

  return (
    <AnimatePresence>
      {inside && (
        <motion.div
          className="mask bg-default-accent ease-in-out"
          initial={{
            scale: 1,
            opacity: 1,
          }}
          animate={{
            scale: 1,
            opacity: 1,
            pointerEvents: 'none',
            WebkitMaskSize: toggle ? '200vh 200vh' : `${50}px`,
          }}
          exit={{
            WebkitMaskSize: `${0}px`,
            opacity: 0,
          }}
        >
          <div className="about_container h-[200vh]">
            <div className="relative w-screen h-screen flex items-center justify-center about_section_hero">
              <div className="!text-default-bg">
                <p className="text-[40px] md:text-[100px] tracking-widest about_name">
                  Typewriter
                </p>
              </div>
            </div>
            <div className="relative w-screen h-screen flex items-center justify-center about_section ">
              <div className="w-full h-[50%] flex items-center justify-center text-default-sub-bg">
                <div className="text-default-bg w-[70%]">
                  <p className="text-[20px] w-fit about_sub_line">
                    Crafting Digital Experiences, One Line at a Time
                  </p>
                  <h1 className="text-[40px] w-full">Front End Developer</h1>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const About = () => {
  const targetClass = 'about';
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const { setState } = useCardContext();

  useGSAP(
    () => {
      let container = ref.current,
        hero = document.querySelectorAll('.about_section_hero')[0],
        sections = document.querySelectorAll('.about_section'),
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
          span.classList.add('inline-block');
        });
      };
      sections.forEach((section) => {
        const splitText = new SplitType(
          hero.querySelector('.about_name')! as TargetElement
        ).chars;

        const splitText2 = new SplitType(
          section.querySelectorAll('.about_sub_line')
        ).chars;

        splitText2?.forEach((char) => {
          char.classList.add('opacity-0', 'skew-x-[50px]', 'blur-[10px]');
        });
        wrapCharsInSpan(splitText!);
      });

      const onSectionEntry = () => {
        // Section One
        tl.fromTo(
          hero.querySelectorAll('.about_name'),
          { autoAlpha: 0 },
          { autoAlpha: 1 }
        ).fromTo(
          hero.querySelectorAll('.char'),
          {
            opacity: 0,
            autoAlpha: 0,
            scale: 2,
            y: -40,
            x: 40,
            filter: 'blur(8px)',
          },
          {
            opacity: 1,
            autoAlpha: 1,
            scale: 1,
            y: 0,
            x: 0,
            filter: 'blur(0px)',
            duration: 0.5,
            ease: 'ease',
            stagger: {
              amount: 0.2,
              from: 'start',
            },
          },
          0
        );

        // Section Two

        gsap.to(sections[0].querySelectorAll('.char'), {
          opacity: 1,
          skewY: 0,
          filter: 'blur(0px)',
          scrollTrigger: {
            trigger: sections[1],
            start: 'top center',
          },
          stagger: {
            amount: 1,
          },
        });
      };

      const onSectionExit = () => {
        tl.fromTo(
          hero.querySelectorAll('.char'),
          {
            opacity: 1,
            autoAlpha: 1,
            y: 0,
            x: 0,
            filter: 'blur(0px)',
            scale: 1,
          },
          {
            opacity: 0,
            autoAlpha: 0,
            scale: 2,
            y: -40,
            x: 40,
            filter: 'blur(8px)',
            scrollTrigger: {
              trigger: horizontal,
              scrub: true,
              start: 'top top',
              end: () => '+=' + sections[0].getBoundingClientRect().height,
            },
            stagger: {
              amount: 0.5,
              from: 'end',
            },
          }
        );

        gsap.fromTo(
          Array.from(sections).slice(1),
          {
            yPercent: 0,
          },
          {
            yPercent: -100,
            scrollTrigger: {
              trigger: container,
              start: 'top end',
              scrub: true,
            },
          }
        );
      };

      onSectionEntry();
      onSectionExit();
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
        syncTouch: true,
      }}
    >
      <div className=" cursor-none">
        <div className="about_container horizontal bg-default-bg" ref={ref}>
          <ImCross
            size={30}
            className="absolute top-10 right-10"
            color="white"
            onClick={() => {
              handleClick({ setState, targetClass, router });
            }}
          />
          <div className="relative w-screen h-screen flex items-center justify-center about_section_hero">
            <div className="!text-default-accent">
              <p className="text-[40px] md:text-[100px] tracking-widest about_name invisible">
                Typewriter
              </p>
              {/* <p className="text-[20px] about_name invisible">
                Elevating Digital Solutions: Where Frontend Meets the Cloud
              </p> */}
            </div>
          </div>

          <div className="relative w-screen h-screen flex items-center justify-center about_section">
            <div className="w-full h-[50%] flex items-center justify-center text-default-sub-bg">
              <div className="text-default-accent w-[70%]">
                <p className="text-[20px] w-fit about_sub_line">
                  Transforming Visions into Cloud Realities
                </p>
                <h1 className="text-[40px] w-full">Cloud Engineer</h1>
              </div>
            </div>
          </div>
        </div>
        <Mask />
      </div>
    </ReactLenis>
  );
};

export default About;
