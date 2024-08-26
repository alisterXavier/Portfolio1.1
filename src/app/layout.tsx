'use client';
import { useGSAP } from '@gsap/react';
import { AnimatePresence, motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { Flip } from 'gsap/Flip';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Observer } from 'gsap/Observer';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Head from 'next/head';
import React, { useEffect } from 'react';
import {
  InitalPageLoadedProvider,
  CardProvider,
  useCardContext,
} from './contexts';
import './globals.css';
import { handleClick } from './sharedPages';
import { useRouter } from 'next/navigation';
import { closeCard } from './components';

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
      <Head>
        <title>Alister Sequeira</title>
      </Head>
      <body>
        <CardProvider>
          <InitalPageLoadedProvider>
            <Layout
              props={{
                children: children,
                modal: modal,
              }}
            />
          </InitalPageLoadedProvider>
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
  const { setState } = useCardContext();
  function applyColors() {
    const variants = ['navy', 'dark'];
    const randomIndex = Math.floor(Math.random() * variants.length);
    const randomVariant = variants[randomIndex];
    const root = document.documentElement;

    if (randomVariant === 'navy') {
      root.style.setProperty('--main', 'var(--main1)');
      root.style.setProperty('--accent', 'var(--accent1)');
      root.style.setProperty('--sub', 'var(--sub1)');
    } else {
      root.style.setProperty('--main', 'var(--main2)');
      root.style.setProperty('--accent', 'var(--accent2)');
      root.style.setProperty('--sub', 'var(--sub2)');
    }
  }
  useEffect(() => {
    applyColors();
    document.body.removeAttribute('style');
  }, []);

  useEffect(() => {
    const handlePopstate = (e: PopStateEvent) => {
      e.preventDefault();
      closeCard({ setState });

      setTimeout(() => {
        let container = document.querySelector(`.modal_container`),
          targetClass: string = container?.getAttribute('data-card')!,
          elem = document.querySelector(`[data-hero=${targetClass}]`),
          app_bounding_rect = container!.getBoundingClientRect(),
          tile_bounding_rect = elem!?.getBoundingClientRect();
        if (tile_bounding_rect) {
          const translateX = tile_bounding_rect.left + 'px',
            translateY = tile_bounding_rect.top + 'px',
            scaleX = tile_bounding_rect.width / app_bounding_rect.width,
            scaleY = tile_bounding_rect.height / app_bounding_rect.height,
            tl = gsap.timeline();
          tl.fromTo(
            container,
            {
              translateX: 0,
              translateY: 0,
              scaleX: 1,
              scaleY: 1,
              borderRadius: '0px',
              background: 'var(--main)',
            },
            {
              translateX: translateX,
              translateY: translateY,
              scaleX: scaleX,
              scaleY: scaleY,
              borderRadius: '10px',
              background: 'var(--sub)',
              ease: 'power3.out',
            }
          ).to(container, {
            autoAlpha: 0,
            onComplete: () => {
              container?.removeAttribute('style');
            },
          });
        }
      }, 500);
    };

    window.addEventListener('popstate', handlePopstate);
    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);

  return (
    <div className="relative bg-[var(--main)]">
      {props.children}
      <motion.div className="absolute z-[100] modal_container w-full min-h-screen top-0 bg-[var(--main)] !text-accent invisible origin-top-left">
        {props.modal}
      </motion.div>
    </div>
  );
};
