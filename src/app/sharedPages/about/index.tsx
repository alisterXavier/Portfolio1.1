'use client';
import { useCardContext } from '@/app/contexts';
import { useGSAP } from '@gsap/react';
import ReactLenis from '@studio-freight/react-lenis';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ImCross } from 'react-icons/im';
import { handleClick } from '../';
import {
  FifthSection,
  FourthSection,
  FourthSpan,
  HeroText,
  SecondSection,
  ThirdSection,
} from './Components';

const Mask = ({
  inside,
  cross,
}: {
  inside: boolean;
  cross: JSX.Element;
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
      className={`mask bg-[var(--accent)] h-full border opacity-0`}
      animate={{
        pointerEvents: 'none',
      }}
    >
      {cross}
      <div className="about_container h-full">
        <HeroText className="!text-[var(--main)]" />
        <SecondSection
          text="Crafting Digital Experiences, One Line at a Time"
          text1="Front End Developer"
          className="!text-[var(--main)]"
        />
        <ThirdSection
          firstColumn={{
            header: 'Front End',
            text1: 'Design',
            text2: 'Develop',
            className: '!bg-[var(--accent)] !text-[var(--main)]',
          }}
          secondColumn={{
            header: 'Cloud',
            text1: 'Plan',
            text2: 'Provision',
            className: '!bg-[var(--main)] !text-[var(--accent)] second-service',
          }}
        />
        <FourthSection className="!text-[var(--main)]">
          I create solutions that blend robustness with{' '}
          <FourthSpan
            text="elegance"
            classNames="bg-[var(--main)] text-[var(--accent)]"
          />
          , designed for modern applications and adapt to evolving demands. My
          work guarantees seamless{' '}
          <FourthSpan
            text="usability"
            classNames="bg-[var(--main)] text-[var(--accent)]"
          />{' '}
          and resilience, ensuring optimal performance for your projects.
        </FourthSection>
        <FifthSection
          headerClassName={'text-[var(--main)]'}
          emailClassName={'bg-[var(--main)] text-[var(--accent)]'}
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
        sections = document.querySelectorAll('.about_section');

      gsap.fromTo(
        sections,
        {
          yPercent: 0,
        },
        {
          yPercent: -100,
          scrollTrigger: {
            trigger: container,
            scrub: true,
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
        onMouseLeave={() => {
          inside && setInside(false);
        }}
      >
        <ImCross
          size={30}
          className="absolute top-10 right-10 cursor-pointer z-[100] text-[var(--accent)]"
          onMouseMove={(e) => {
            e.preventDefault();
            setInside(false);
          }}
          onClick={(e) => {
            e.preventDefault();
            handleClick({ setState, targetClass, router });
          }}
        />
        <div className="about_container horizontal bg-[var(--main)]">
          <HeroText className="!text-[var(--accent)]" />
          <SecondSection
            text="Transforming Visions into Cloud Realities"
            text1="Cloud Engineer"
            className="!text-[var(--accent)]"
          />
          <ThirdSection
            setInside={setInside}
            firstColumn={{
              header: 'Cloud',
              text1: 'Plan',
              text2: 'Provision',
              className: '!bg-[var(--main)] !text-[var(--accent)]',
            }}
            secondColumn={{
              header: 'Front End',
              text1: 'Design',
              text2: 'Develop',
              className:
                '!bg-[var(--accent)] !text-[var(--main)] second-service',
            }}
          />
          <FourthSection className="!text-[var(--accent)]">
            I create solutions that blend robustness with{' '}
            <FourthSpan
              text="scalability"
              classNames="bg-[var(--accent)] text-[var(--main)]"
            />
            , designed for modern applications and adapt to evolving demands. My
            work guarantees seamless{' '}
            <FourthSpan
              text="reliability"
              classNames="bg-[var(--accent)] text-[var(--main)]"
            />{' '}
            and resilience, ensuring optimal performance for your projects.
          </FourthSection>
          <FifthSection
            headerClassName={'text-[var(--accent)]'}
            emailClassName={
              'bg-[var(--accent)] text-[var(--main)] fill-default-bg'
            }
          />
        </div>
        <Mask
          inside={inside}
          cross={
            <ImCross
              size={30}
              className="absolute top-10 right-10 cursor-pointer text-[var(--main)]"
            />
          }
        />
      </div>
    </ReactLenis>
  );
};

export default About;
