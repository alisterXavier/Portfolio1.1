import { useCardContext, useCardLoadedContext } from '@/app/contexts';
import Image from 'next/image';
import { useMemo, useRef } from 'react';
import { CardWrapper } from '..';
import projects from '../../../../../public/assets/data/projects.json';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export const Projects = (): JSX.Element => {
  const { state } = useCardContext();
  const { state: cardsLoaded } = useCardLoadedContext();
  const ref = useRef<HTMLDivElement | null>(null);

  const positions: { x: number; y: number }[] | any[] = useMemo(() => {
    if (!ref.current || !cardsLoaded) return [];

    function getRandomPositions(arr: any, num: number) {
      const results = new Set();
      while (results.size < num) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        results.add(arr[randomIndex]);
      }
      results.add({
        elemen: document.querySelectorAll('.project__item')[7],
        x: 0,
        y: 0,
      });
      return Array.from(results);
    }

    const { width, height } = ref.current
      .querySelector('.project__list .project__item__inner')!
      .getBoundingClientRect();

    const Xmax = 600;
    const margin = 10;
    const Mmax = 20;

    const numberofColumns = 5;
    const centerRow = Math.floor(
      Math.floor(projects.length / numberofColumns) / 2
    );

    const calculatedPositions = projects.map((i, index) => {
      const currRow = Math.floor(index / numberofColumns);
      const centerEachRow =
        currRow * numberofColumns + Math.floor(numberofColumns / 2);
      const offset = index - centerEachRow;
      const column = offset + 2;

      //  y ->             150   0  -150
      //  x ->      	       0   1    2   3    4
      //  margin_for_x ->   20  10    0   10   20
      //                   600 300    0  -300 -600

      const element = document.querySelectorAll('.project__item')[index];
      const margin_for_x = Mmax - margin * column;
      var x = Xmax - (width as number) * column + margin_for_x;
      const y =
        currRow === centerRow
          ? 0
          : currRow < centerRow
          ? (height as number) + margin
          : -(height as number) - margin;

      return {
        element: element,
        x: x,
        y: y,
      };
    });

    return getRandomPositions(calculatedPositions, 7);
  }, [ref, cardsLoaded]);

  useGSAP(
    () => {
      if (!positions?.length || !cardsLoaded) return;

      const timeline = gsap.timeline({
        repeat: -1,
      });

      if (!state) {
        positions.forEach((item: (typeof positions)[0], index) => {
          timeline.to(ref.current, {
            translate: `${item.x}px ${item.y}px`,
            duration: 1,
            ease: 'power1.inOut',
            delay: 0.5,
          });
        });
      } else {
        timeline.pause();
      }

      return () => {
        timeline.kill();
      };
    },
    {
      dependencies: [state, cardsLoaded, positions],
      scope: ref,
      revertOnUpdate: true,
    }
  );

  return (
    <CardWrapper
      parentClasses="mouse_card col-span-full row-span-3 md:col-span-3 md:row-span-2"
      className={`hero_section flex items-center justify-center`}
      targetClass="projects"
    >
      <div className="relative overflow-hidden w-[100%] h-[100%] transition-all duration-500 items-center justify-center flex cursor-pointer project__list__wrapper bg-default-sub-bg">
        <div
          className="absolute w-[1540px] project_list grid gap-[10px] grid-cols-5 project__list bg-default-sub-bg"
          ref={ref}
        >
          {projects.map((item, index) => {
            return item.img.length ? (
              <div
                className="project__item w-full h-full overflow-hidden"
                key={index}
              >
                <figure className="relative h-[150px] project__item__inner">
                  <Image src={item.img[0]} alt={item.title} fill sizes="100%" />
                </figure>
              </div>
            ) : (
              <div className="relative w-full h-full project__item overflow-hidden flex items-center justify-center">
                <div className="absolute h-full w-full overflow-hidden border-3 border-default-accent project__item__inner flex items-center justify-center">
                  <p className="text-[20px] text-default-accent">¯\_(ツ)_/¯</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className={`absolute w-[300px] h-[150px] projects_list_tracker`}>
          <span className="absolute top-0 left-0 border-l-default-accent border-t-default-accent border-l-4 border-t-4 h-[30px] w-[30px]"></span>
          <span className="absolute top-0 right-0 border-r-default-accent border-t-default-accent border-r-4 border-t-4 h-[30px] w-[30px]"></span>
          <span className="absolute bottom-0 left-0 border-l-default-accent border-b-default-accent border-l-4 border-b-4 h-[30px] w-[30px]"></span>
          <span className="absolute bottom-0 right-0 border-r-default-accent border-b-default-accent border-r-4 border-b-4 h-[30px] w-[30px]"></span>
        </div>
      </div>
    </CardWrapper>
  );
};
