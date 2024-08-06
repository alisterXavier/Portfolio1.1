'use client';
import { useCardContext } from '@/app/contexts';
import { AnimatePresence, motion, useMotionValue } from 'framer-motion';
import React, { useEffect, useState } from 'react';

interface ParallaxProps {
  children: React.ReactNode;
}

export const Parallax: React.FC<ParallaxProps> = ({ children }) => {
  const { state } = useCardContext();
  const [title, setTitle] = useState<string | null>(null);
  const [inside, setInside] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    // TODO Possible Parallax Feature
    // const speed: number[] = [0.05, 0.03, 0.04, 0.02];
    // const elems = document.querySelectorAll('.parallax');

    // mouseMoveRef.current = (e: MouseEvent) => {
    //   elems.forEach((elem, index) => {
    //     const { clientX, clientY } = e;
    //     const translateX = (clientX - window.innerWidth / 2) * speed[index];
    //     const translateY = (clientY - window.innerHeight / 2) * speed[index];

    //     gsap.to(elem, {
    //       x: translateX,
    //       y: translateY,
    //       duration: 0.75,
    //     });
    //   });
    // };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const { scrollX, scrollY } = window;
      const text = e.currentTarget.getAttribute('data-hero');
      setTitle(text);
      setInside(true);
      x.set(e.clientX + scrollX + 20);
      y.set(e.clientY + scrollY + 20);
    };
    const handleMouseLeave = () => {
      setInside(false);
      setTitle(null);
    };

    const addEventListeners = () => {
      document.querySelectorAll('.mouse_card').forEach((item) => {
        item.addEventListener('mousemove', handleMouseMove as any);
        item.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    const removeEventListeners = () => {
      document.querySelectorAll('.mouse_card').forEach((item) => {
        item.removeEventListener('mousemove', handleMouseMove as any);
        item.removeEventListener('mouseleave', handleMouseLeave);
      });
    };

    if (!state) {
      addEventListeners();
    } else {
      removeEventListeners();
      handleMouseLeave();
    }

    return () => {
      removeEventListeners();
    };
  }, [state, x, y]);

  return (
    <div className="w-full h-full">
      <AnimatePresence>
        {inside && (
          <motion.div
            style={{
              top: y,
              left: x,
              pointerEvents: 'none',
            }}
            initial={{
              scale: 1,
              opacity: 1,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0,
              opacity: 0,
            }}
            className="absolute z-[100] opacity-0 top-0 left-0 px-5 py-2 rounded-[15px] tooltip text-[15px] text-default-bg capitalize bg-default-accent"
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </div>
  );
};
