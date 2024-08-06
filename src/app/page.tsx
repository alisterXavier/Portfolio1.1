'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'swiper/css';
import 'swiper/css/pagination';
import {
  About,
  Certificates,
  Connect,
  Expertise,
  Parallax,
  Profile,
  Projects,
  Socials,
  Stack,
  Work,
} from './components';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

export default function Home() {
  useGSAP(() => {
    const elemsX = document.querySelectorAll('.animate-card-x');
    const elemsY = document.querySelectorAll('.animate-card-y');

    gsap.to(elemsY, {
      y: 0,
      scaleY: '100%',
      duration: 1.6,
      ease: 'expo.inOut',
      stagger: {
        amount: 0.05,
      },
    });
    gsap.to(elemsX, {
      x: 0,
      scaleX: '100%',
      duration: 1.6,
      ease: 'expo.inOut',
      stagger: {
        amount: 0.05,
      },
    });
  }, []);
  useEffect(() => {
    toast('Portfolio is still in progress', {
      duration: 10000,
      className: '!text-default-accent !bg-default-sub-bg',
      style: {},
      position: 'top-right',
    });
  }, []);
  return (
    <Parallax>
      <Toaster />
      <main className="main__wrapper relative min-h-full md:h-screen min-w-full cursor-default perspective-1000 transform-style-3d flex items-center justify-center overflow-hidden">
        <div className="relative p-10 grid-cols-4 grid-rows-8 items-start md:grid-cols-7 md:grid-rows-4 grid gap-3 perspective-1000 transform-style-3d w-full min-h-full">
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
    </Parallax>
  );
}
