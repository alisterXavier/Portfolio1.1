'use client';
import { ImCross } from 'react-icons/im';
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
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function Home() {
  useGSAP(() => {
    const elems = document.querySelectorAll('.hero-card');
    gsap.fromTo(
      elems,
      { y: '-100%', scaleY: '0%' },
      {
        y: 0,
        scaleY: '100%',
        duration: 1.6,
        ease: 'expo.inOut',
        stagger: {
          amount: 0.05,
        },
      }
    );
  }, []);
  return (
    <Parallax>
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
