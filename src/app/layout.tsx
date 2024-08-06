'use client';
import { useGSAP } from '@gsap/react';
import { NextUIProvider } from '@nextui-org/react';
import { AnimatePresence, motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { Flip } from 'gsap/Flip';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Observer } from 'gsap/Observer';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect } from 'react';
import { CardProvider, useCardContext } from './contexts';
import './globals.css';

gsap.registerPlugin(
  ScrollTrigger,
  Observer,
  ScrollToPlugin,
  MotionPathPlugin,
  useGSAP,
  Draggable,
  Flip
);

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={'bg-default-bg'}>
        <CardProvider>
          <Layout
            props={{
              children: children,
              modal: modal,
            }}
          />
        </CardProvider>
      </body>
    </html>
  );
}

const Layout = ({
  props,
}: {
  props: {
    children: React.ReactNode;
    modal: React.ReactNode;
  };
}) => {
  const { state, setState } = useCardContext();

  useEffect(() => {
    document.body.removeAttribute('style');
  }, []);

  useEffect(() => {
    const handlePopstate = () => {
      setState('');
    };

    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);

  return (
    <NextUIProvider>
      {props.children}
      <AnimatePresence>
        {state && (
          <motion.div
            className="fixed z-[100] p-10 modal_container w-screen h-screen overflow-y-scroll top-0 left-0 bg-default-bg !text-default-accent"
            layoutId={state}
            key={state}
          >
            {props.modal}
          </motion.div>
        )}
      </AnimatePresence>
    </NextUIProvider>
  );
};

// const ExitAnimations = ({ children }: { children: React.ReactNode }) => {
//   const { contextSafe } = useGSAP(() => {}, {});
//   const aboutExit = contextSafe(() => {
//     gsap.to('.about_container', { opacity: 0, duration: 0.4 });
//   });

//   const workExit = contextSafe(() => {
//     gsap.to('.work_container', { opacity: 0, duration: 0.4 });
//   });
//   const projectExit = contextSafe(() => {
//     // gsap.to('.projects_container', { opacity: 0, duration: 0.4 });
//   });

//   eventEmitter.on('about', () => {
//     aboutExit();
//   });
//   eventEmitter.on('work', () => {
//     workExit();
//   });
//   eventEmitter.on('projects', () => {
//     projectExit();
//   });
//   return <>{children}</>;
// };
