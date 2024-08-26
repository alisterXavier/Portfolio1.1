'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import 'swiper/css';
import 'swiper/css/pagination';
import {
  About,
  Certificates,
  Connect,
  Expertise,
  Profile,
  Projects,
  Socials,
  Stack,
  ToolTip,
  Work,
} from './components';
import { useInitalPageLoadedContext } from './contexts';

export default function Home() {
  const { setState } = useInitalPageLoadedContext();

  useGSAP(() => {
    const elemsX = document.querySelectorAll('.animate-card-x');
    const elemsY = document.querySelectorAll('.animate-card-y');
    const tl = gsap.timeline();
    tl.to(elemsY, {
      y: 0,
      scaleY: '100%',
      duration: 1.6,
      ease: 'expo.inOut',
      stagger: {
        amount: 0.05,
      },
    }).to(
      elemsX,
      {
        x: 0,
        scaleX: '100%',
        duration: 1.6,
        ease: 'expo.inOut',
        stagger: {
          amount: 0.05,
        },
        onComplete: () => {
          setState(true);
        },
      },
      '-=1'
    );
  }, []);

  useEffect(() => {
    toast(
      (t) => (
        <span>
          Portfolio is still in progress
          <button
            onClick={() => toast.dismiss(t.id)}
            className="!bg-[var(--main)] ml-2 p-2"
          >
            Dismiss
          </button>
        </span>
      ),
      {
        duration: 10000,
        className: '!text-[var(--accent)] !bg-[var(--sub)]',
        style: {},
        position: 'top-right',
      }
    );
  }, []);

  return (
    <ToolTip>
      <Toaster />
      <main className="main__wrapper relative min-h-full md:h-screen min-w-full cursor-default perspective-1000 transform-style-3d flex items-center justify-center overflow-hidden">
        <div className="relative p-10 grid-cols-4 grid-rows-9 items-start md:grid-cols-7 md:grid-rows-4 grid gap-3 perspective-1000 transform-style-3d w-full min-h-full">
          <About />
          <Stack />
          <Socials />
          <Certificates />
          <Profile />
          <Expertise />
          <Work />
          <Projects />
          <Connect />
        </div>
      </main>
    </ToolTip>
  );
}
