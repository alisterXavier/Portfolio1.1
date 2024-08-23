'use client';
import { useCardContext } from '@/app/contexts';
import { useGSAP } from '@gsap/react';
import ReactLenis from '@studio-freight/react-lenis';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { ImCross } from 'react-icons/im';
import SplitType, { TargetElement } from 'split-type';
import { handleClick } from '../';
import {
  FifthSection,
  FourthSection,
  HeroText,
  SecondSection,
  ThirdSection,
  FourthSpan,
} from './Components';

const Mask = ({
  inside,
  setInside,
}: {
  inside: boolean;
  setInside: Dispatch<SetStateAction<boolean>>;
}) => {
  const test = useRef<number>(0);
  const [toggle, setToggle] = useState(false);
  const { context } = useGSAP();
  const delayedEffect = useRef({
    x: 0,
    y: 0,
  });
  const mouse = useRef({
    x: 0,
    y: 0,
  });
  const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

  useEffect(() => {
    const moveCircle = (x: number, y: number) => {
      context.add(() => {
        gsap.set('.mask', {
          clipPath: `circle(50px at ${x}px ${y}px)`,
        });
      });
    };

    const animate = () => {
      const { x, y } = delayedEffect.current;
      delayedEffect.current = {
        x: lerp(x, mouse.current.x, 0.08),
        y: lerp(y, mouse.current.y, 0.08),
      };
      moveCircle(delayedEffect.current.x, delayedEffect.current.y);
      test.current = window.requestAnimationFrame(animate);
    };

    const addEventListeners = () => {
      window.addEventListener('mousemove', handleMouseMove);
    };

    const removeEventListeners = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.cancelAnimationFrame(test.current);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { scrollX, scrollY } = window;
      mouse.current = {
        x: clientX + scrollX,
        y: clientY + scrollY,
      };
      moveCircle(mouse.current.x, mouse.current.y);
    };

    const handleMouseClick = (e: MouseEvent) => {
      context.add(() => {
        if (toggle) {
          gsap.to('.mask', {
            clipPath: `circle(50px at ${delayedEffect.current.x}px ${delayedEffect.current.y}px)`,
            duration: 0.3,
            onComplete: () => setToggle(false),
          });
        } else {
          setToggle(true);
          gsap.to('.mask', {
            clipPath: `circle(100% at ${delayedEffect.current.x}px ${delayedEffect.current.y}px)`,
            duration: 0.3,
          });
        }
      });
    };

    if (!toggle) {
      animate();
      addEventListeners();
    } else {
      removeEventListeners();
    }

    window.addEventListener('click', handleMouseClick);

    return () => {
      removeEventListeners();
      window.removeEventListener('click', handleMouseClick);
    };
  }, [toggle]);

  useEffect(() => {
    if (inside)
      gsap.to('.mask', {
        opacity: 1,
      });
    else
      gsap.to('.mask', {
        opacity: 0,
      });
  }, [inside]);

  return (
    <motion.div
      className={`mask bg-default-accent h-full border opacity-0`}
      animate={{
        pointerEvents: 'none',
      }}
    >
      <div className="about_container h-full">
        <HeroText className="!text-default-bg" />
        <SecondSection
          text="Crafting Digital Experiences, One Line at a Time"
          text1="Front End Developer"
          className="!text-default-bg"
        />
        <ThirdSection
          firstColumn={{
            header: 'Front End',
            text1: 'Design',
            text2: 'Develop',
            className: '!bg-default-accent !text-default-bg',
          }}
          secondColumn={{
            header: 'Cloud',
            text1: 'Plan',
            text2: 'Provision',
            className: '!bg-default-bg !text-default-accent second-service',
          }}
        />
        <FourthSection className="!text-default-bg">
          I create solutions that blend robustness with{' '}
          <FourthSpan
            text="elegance"
            classNames="bg-default-bg text-default-accent"
          />
          , designed for modern applications and adapt to evolving demands. My
          work guarantees seamless{' '}
          <FourthSpan
            text="usability"
            classNames="bg-default-bg text-default-accent"
          />{' '}
          and resilience, ensuring optimal performance for your projects.
        </FourthSection>
        <FifthSection
          headerClassName={'text-default-bg'}
          emailClassName={'bg-default-bg text-default-accent'}
        />
      </div>
    </motion.div>
  );
};

const About = () => {
  const router = useRouter();
  const targetClass = 'about';
  const { setState } = useCardContext();
  const ref = useRef<HTMLDivElement>(null);
  const [inside, setInside] = useState<boolean>(false);

  useGSAP(
    () => {
      let container = ref.current,
        heros = container!.querySelectorAll('.about_section_hero'),
        sections = document.querySelectorAll('.about_section'),
        horizontal = document.querySelectorAll('.horizontal'),
        tl = gsap.timeline({
          defaults: { duration: 1.25, ease: 'power1.inOut' },
        });

      const splitText = () => {
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
          const splitText2 = new SplitType(
            section.querySelectorAll('.about_sub_line')
          ).chars;

          splitText2?.forEach((char) => {
            char.classList.add('opacity-0', 'skew-x-[50px]', 'blur-[10px]');
          });
        });
        heros.forEach((hero) => {
          const splitText = new SplitType(
            hero.querySelector('.about_name')! as TargetElement
          ).chars;
          wrapCharsInSpan(splitText!);
        });
      };
      splitText();

      const onSectionEntry = () => {
        const name = heros[0]?.querySelectorAll('.about_name'),
          name2 = heros[1]?.querySelectorAll('.about_name'),
          chars = heros[0]?.querySelectorAll('.char'),
          chars2 = heros[1]?.querySelectorAll('.char');
        tl.fromTo([name, name2], { autoAlpha: 0 }, { autoAlpha: 1 }).fromTo(
          [chars, chars2],
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

        sections.forEach((section) => {
          gsap.to([section.querySelectorAll('.char')], {
            opacity: 1,
            skewY: 0,
            filter: 'blur(0px)',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
            },
            stagger: {
              amount: 1,
            },
          });
        });
      };

      const onSectionExit = () => {
        const chars = heros[0]?.querySelectorAll('.char'),
          chars2 = heros[1]?.querySelectorAll('.char');
        tl.fromTo(
          chars,
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
            scale: 1.8,
            y: -40,
            x: 40,
            filter: 'blur(8px)',
            scrollTrigger: {
              trigger: horizontal,
              scrub: true,
              start: 'top top',
              end: () =>
                '+=' + (sections[0].getBoundingClientRect().height - 100),
            },
            stagger: {
              amount: 0.8,
              from: 'end',
            },
          }
        );
        tl.fromTo(
          chars2,
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
            scale: 1.8,
            y: -40,
            x: 40,
            filter: 'blur(8px)',
            scrollTrigger: {
              trigger: horizontal,
              scrub: true,
              start: 'top top',
              end: () =>
                '+=' + (sections[0].getBoundingClientRect().height - 100),
            },
            stagger: {
              amount: 0.8,
              from: 'end',
            },
          },
          '-=0'
        );

        gsap.fromTo(
          Array.from(sections),
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
      scope: ref,
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
      <div
        className="cursor-none- h-[400vh] relative overflow-hidden"
        ref={ref}
        onMouseMove={() => {
          !inside && setInside(true);
        }}
      >
        <ImCross
          size={30}
          className="absolute top-10 right-10 z-[100]"
          color="white"
          onClick={(e) => {
            e.preventDefault()
            handleClick({ setState, targetClass, router });
          }}
        />
        <div className="about_container horizontal bg-default-bg">
          <HeroText className="!text-default-accent" />
          <SecondSection
            text="Transforming Visions into Cloud Realities"
            text1="Cloud Engineer"
            className="!text-default-accent"
          />
          <ThirdSection
            setInside={setInside}
            firstColumn={{
              header: 'Cloud',
              text1: 'Plan',
              text2: 'Provision',
              className: '!bg-default-bg !text-default-accent',
            }}
            secondColumn={{
              header: 'Front End',
              text1: 'Design',
              text2: 'Develop',
              className: '!bg-default-accent !text-default-bg second-service',
            }}
          />
          <FourthSection className="!text-default-accent">
            I create solutions that blend robustness with{' '}
            <FourthSpan
              text="scalability"
              classNames="bg-default-accent text-default-bg"
            />
            , designed for modern applications and adapt to evolving demands. My
            work guarantees seamless{' '}
            <FourthSpan
              text="reliability"
              classNames="bg-default-accent text-default-bg"
            />{' '}
            and resilience, ensuring optimal performance for your projects.
          </FourthSection>
          <FifthSection
            headerClassName={'text-default-accent'}
            emailClassName={'bg-default-accent text-default-bg fill-default-bg'}
          />
        </div>
        <Mask inside={inside} setInside={setInside} />
      </div>
    </ReactLenis>
  );
};

export default About;
