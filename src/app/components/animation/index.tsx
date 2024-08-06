'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { mergeClassNames } from '../classNames';

export const executeMainPageExitAnimation = (
  page: string,
  setPage: (val: string) => void
) => {
  const chars = document
    .querySelector('[data-hero-title]')
    ?.querySelectorAll('.char');
  var charsList;

  if (chars) charsList = Array.from(chars as any);

  const timeline = gsap.timeline();
  timeline.to(charsList ?? null, {
    translateY: '-30px',
    translateX: '0px',
    filter: 'blur(8px)',
    opacity: 0,
    skewX: '5deg',
    stagger: {
      amount: 0.5,
    },
    duration: 0.5,
    onComplete: () => {
      setPage(page);
    },
  });
};

type closeCardType = {
  setState: Dispatch<SetStateAction<string | null>>;
};
export const closeCard = ({ setState }: closeCardType) => {
  window.scrollTo(0, 0);
  setState(null);
};

type MenuType = {
  targetClass: string;
  setState: React.Dispatch<SetStateAction<string | null>>;
  router: AppRouterInstance;
  back?: { toggle: any; setToggle: Dispatch<SetStateAction<any | null>> };
};
export const Menu = ({ targetClass, setState, router, back }: MenuType) => {
  const handleClick = (e: React.MouseEvent) => {
    if (!back?.toggle) {
      setTimeout(() => {
        closeCard({ setState });
        setTimeout(() => {
          router.back();
        }, 500);
      }, 500);
    }
    back?.setToggle(null);
  };
  return (
    <div
      className={mergeClassNames(
        'cross cursor-pointer fixed z-[4] top-10 right-[5%]',
        back?.toggle && 'back'
      )}
      onClick={handleClick}
    >
      <div className=" w-full h-full">
        <span className="straight bg-default-accent"></span>
        <span className="straight bg-default-accent"></span>
      </div>
      <div className="absolute z-[1]">
        <span className="icon arrow border-l-[5px] border-t-[5px] border-default-accent"></span>
      </div>
    </div>
  );
};
