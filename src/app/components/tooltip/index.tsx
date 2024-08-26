'use client';
import { useCardContext, useInitalPageLoadedContext } from '@/app/contexts';
import { AnimatePresence, motion, useMotionValue } from 'framer-motion';
import React, { useEffect, useState } from 'react';

interface ToolTipProps {
  children: React.ReactNode;
}

export const ToolTip: React.FC<ToolTipProps> = ({ children }) => {
  const { state } = useCardContext();
  const { state: cardLoaded } = useInitalPageLoadedContext();
  const [title, setTitle] = useState<string | null>(null);
  const [inside, setInside] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
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

    if (!state && cardLoaded) {
      addEventListeners();
    } else {
      removeEventListeners()
      handleMouseLeave()
    }

    return () => {
      removeEventListeners();
    };
  }, [cardLoaded, state, x, y]);

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
            className="absolute z-[100] opacity-0 top-0 left-0 px-5 py-2 rounded-[15px] tooltip text-[15px] text-[var(--main)] capitalize bg-[var(--accent)]"
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </div>
  );
};
