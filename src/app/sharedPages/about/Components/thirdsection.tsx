import { mergeClassNames } from '@/app/components';
import { useGSAP } from '@gsap/react';
import { Variants, motion } from 'framer-motion';
import gsap from 'gsap';
import { Dispatch, SetStateAction, forwardRef, useRef } from 'react';

const ThirdSpan = forwardRef<
  HTMLDivElement,
  {
    className: string;
    header: string;
    text1: string;
    text2: string;
    style?: any;
  }
>(({ className, header, text1, text2, style }, ref) => {
  const variants: Variants = {
    initial: {
      y: 0,
      rotate: 0,
    },
    hover: {
      y: '-150%',
      rotate: -20,
      transition: {
        duration: 0.5,
      },
    },
  };

  const variants1: Variants = {
    initial: {
      y: '100%',
      rotate: 20,
    },
    hover: {
      y: '-100%',
      rotate: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  useGSAP(
    () => {
      const animate = () => {
        if (ref && typeof ref !== 'function') {
          const element = ref as React.RefObject<HTMLDivElement>;
          gsap.fromTo(
            '.second-service',
            {
              clipPath: 'circle(0px at 0px 0px)',
            },
            {
              clipPath: 'circle(100% at 50% 50%)',
              scrollTrigger: {
                trigger: element.current,
                start: element.current?.getBoundingClientRect().height,
              },
              duration: 0.8,
            }
          );
        }
      };
      animate();
    },
    {
      dependencies: [ref],
    }
  );

  return (
    <div
      className={mergeClassNames(
        'text-[20px] h-[50vh] md:h-full md:w-[50%] flex flex-col items-center justify-center',
        className
      )}
      style={style}
    >
      <p className="text-[20px] w-[70%]">{header}</p>
      <div className="space-bold w-[70%] h-[50%] grid grid-rows-3">
        <motion.h1
          className="text-[50px] md:text-[100px] w-fit service-text row-span-1 overflow-hidden"
          whileHover="hover"
          initial="initial"
        >
          <motion.span className="block h-full" variants={variants}>
            {text1}
          </motion.span>
          <motion.span className="block h-full" variants={variants1}>
            {text1}
          </motion.span>
        </motion.h1>
        <motion.h1
          className="text-[50px] md:text-[100px] w-fit service-text row-span-1 overflow-hidden"
          whileHover="hover"
          initial="initial"
        >
          <motion.span className="block h-full" variants={variants}>
            {text2}
          </motion.span>
          <motion.span className="block h-full" variants={variants1}>
            {text2}
          </motion.span>
        </motion.h1>
        <h1 className="text-[50px] md:text-[100px] w-full row-span-1">
          Deploy
        </h1>
      </div>
    </div>
  );
});

export const ThirdSection: React.FC<{
  firstColumn: {
    header: string;
    text1: string;
    text2: string;
    className: string;
  };
  secondColumn: {
    header: string;
    text1: string;
    text2: string;
    className: string;
  };
  setInside?: Dispatch<SetStateAction<boolean>>;
}> = ({ setInside, firstColumn, secondColumn }) => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      className="relative w-screen h-[100vh] md:h-screen flex items-center justify-center about_section"
      onMouseMove={(e) => {
        e.stopPropagation();
        setInside && setInside(false);
      }}
      ref={ref}
    >
      <div className="w-full h-full md:flex items-center justify-center">
        <ThirdSpan
          className={firstColumn.className}
          header={firstColumn.header}
          text1={firstColumn.text1}
          text2={firstColumn.text2}
          ref={ref}
        />
        <ThirdSpan
          className={secondColumn.className}
          header={secondColumn.header}
          text1={secondColumn.text1}
          text2={secondColumn.text2}
          style={{ clipPath: 'circle(0px at 0px 0px)' }}
          ref={ref}
        />
      </div>
    </div>
  );
};

ThirdSpan.displayName = 'ThirdSpan';