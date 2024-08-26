'use client';
import { Menu } from '@/app/components';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import projects from '../../../../public/assets/data/projects.json';
import { useCardContext } from '../../contexts';
import Project, { ProjectType } from './project';

function calculateIntersection(rec1: DOMRect, rec2: DOMRect) {
  const xIntersection = Math.max(
    0,
    Math.min(rec1.right, rec2.right) - Math.max(rec1.left, rec2.left)
  );
  const yIntersection = Math.max(
    0,
    Math.min(rec1.bottom, rec2.bottom) - Math.max(rec1.top, rec2.top)
  );
  return xIntersection * yIntersection;
}

const Projects = () => {
  const router = useRouter();
  const ref = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const targetClass = 'projects';
  const { setState } = useCardContext();
  const [toggleProject, setToggleProject] = useState<ProjectType | null>(null);

  return (
    <motion.div
      className="w-full h-screen bg-[var(--sub)] projects_container relative"
      layoutId={'projects'}
    >
      <Menu
        setState={setState}
        targetClass={targetClass}
        router={router}
        back={{ toggle: toggleProject, setToggle: setToggleProject }}
      />

      <motion.div className="w-full h-full flex items-end relative z-[0]">
        <motion.div className="relative overflow-hidden w-[100%] h-[100%] bg-[var(--main)] flex items-center justify-center">
          <motion.div
            className="project__list absolute w-[450%] md:w-[300%] md:h-[200%] h-[100%] grid grid-cols-5 grid-rows-3 gap-3"
            ref={ref}
          >
            {projects.map((item, index) => (
              <motion.div
                key={index}
                className="project__item h-[100%] w-[100%] hover:cursor-pointer overflow-hidden"
                layoutId={item.title}
                // onClick={() => toggleProjectModal(item)}
              >
                {item.img.length && item.img.length > 0 ? (
                  <figure className="relative h-full w-full project__item__inner">
                    <Image
                      src={item.img[0]}
                      alt={item.title}
                      fill
                      sizes="100%"
                      className="project__item__inner__content"
                    />
                  </figure>
                ) : (
                  <div className="relative w-full h-full project__item__inner overflow-hidden flex items-center justify-center">
                    <div className="absolute h-full w-full overflow-hidden border-3 border-default-accent project__item__inner__content flex items-center justify-center">
                      <p className="text-[100px] text-[var(--accent)]">
                        ¯\_(ツ)_/¯
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
      
      <AnimatePresence>
        {toggleProject && (
          <motion.div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full z-[3]">
            <Project project={toggleProject} />
            <motion.div
              className="fixed bg-[var(--main)] opacity-[0.6] top-0 left-0 w-screen h-screen z-[-1]"
              exit={{
                opacity: 0,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Projects;
