'use client';
import { Menu } from '@/app/components';
import { useGSAP } from '@gsap/react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
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
  const targetClass = 'projects';
  const { setState } = useCardContext();
  const router = useRouter();
  const ref = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const [toggleProject, setToggleProject] = useState<ProjectType | null>(null);
  function onDragFunctions(
    target: HTMLDivElement,
    projectImages: NodeListOf<Element>,
    container: Element
  ): {
    onDragEnd: () => void;
    startAnimation: () => void;
    releaseAnimation: () => void;
  } {
    const targetArea = target.offsetHeight * target.offsetWidth;
    var collidingImages: any[] = [];

    function animate(
      container: Element,
      image: Element,
      target: HTMLDivElement
    ) {
      try {
        const distanceX =
          target.getBoundingClientRect().x - image.getBoundingClientRect().x;
        const distanceY =
          target.getBoundingClientRect().y - image.getBoundingClientRect().y;

        var x, y;
        const style = window.getComputedStyle(container);
        const matrix = style.transform;
        const matrixValues = (
          matrix.match(/matrix.*\((.+)\)/) as any[]
        )[1].split(', ');
        const matrixType = matrix.includes('3d') ? '3d' : '2d';

        if (matrixType === '2d') {
          x = matrixValues[4];
          y = matrixValues[5];
        }

        const toMoveX = distanceX + parseInt(x);
        const toMoveY = distanceY + parseInt(y);

        gsap.to(container, {
          x: toMoveX,
          y: toMoveY,
          ease: 'expoScale(0.5,7,none)',
        });

        releaseAnimation();
      } catch (err) {
        return;
      }
    }

    const startAnimation = () => {
      gsap.to('.project__item__inner__content', {
        scale: 0.95,
        ease: 'expoScale(0.5,7,none)',
      });
      gsap.to('.target__inner', {
        scale: 1.05,
        ease: 'expoScale(0.5,7,none)',
      });
    };

    const releaseAnimation = () => {
      gsap.to('.project__item__inner__content', {
        scale: 1,
        ease: 'expoScale(0.5,7,none)',
      });
      gsap.to('.target__inner', {
        scale: 1,
        ease: 'expoScale(0.5,7,none)',
      });
    };

    const onDragEnd = () => {
      collidingImages = [];
      projectImages.forEach((image, index) => {
        const imageRect = image.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const collidingArea = calculateIntersection(imageRect, targetRect);
        const collidingAreaCheck = collidingArea / targetArea > 0.25;

        if (collidingAreaCheck) {
          collidingImages.push({ image: image, number: collidingArea });
        }
      });

      const maxCollidingImage = collidingImages.reduce((a, b) => {
        return a.number > b.number ? a : b;
      }, 0);

      animate(container, maxCollidingImage.image, target);
    };

    return { onDragEnd, startAnimation, releaseAnimation };
  }

  function toggleProjectModal(item: ProjectType) {
    setToggleProject(item);
  }

  useGSAP(() => {
    const container = ref.current;
    const target = targetRef.current;

    if (!container || !target) return;

    const projectImages = container.querySelectorAll(
      '.project__item .project__item__inner'
    );

    gsap.set(target, {
      width: projectImages[0].clientWidth,
      height: projectImages[0].clientHeight,
    });
    gsap.set(target.querySelector('.target__inner'), {
      width: projectImages[0].clientWidth,
      height: projectImages[0].clientHeight,
    });

    const boundX = container.clientWidth / 2;
    const boundY = container.clientHeight / 2;

    const drag = onDragFunctions(target, projectImages, container);

    const draggable = Draggable.create(container, {
      type: 'x,y',
      edgeResistance: 0.3,
      resistance: 1,
      inertia: true,
      bounds: {
        minX: -boundX,
        maxX: boundX,
        minY: -boundY,
        maxY: boundY,
      },
      onPress: () => {
        drag.startAnimation();
      },
      onRelease: () => {
        drag.releaseAnimation();
      },
      onDragEnd: () => {
        drag.onDragEnd();
      },
    });

    return () => {
      draggable[0].kill();
    };
  }, []);

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
                onClick={() => toggleProjectModal(item)}
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
          <motion.div
            className="pointer-events-none absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] projects_list_tracker z-[2000]"
            ref={targetRef}
          >
            <motion.div className="target__inner">
              <span className="absolute top-0 left-0 border-l-default-accent border-t-default-accent border-l-4 border-t-4 h-[30px] w-[30px]"></span>
              <span className="absolute top-0 right-0 border-r-default-accent border-t-default-accent border-r-4 border-t-4 h-[30px] w-[30px]"></span>
              <span className="absolute bottom-0 left-0 border-l-default-accent border-b-default-accent border-l-4 border-b-4 h-[30px] w-[30px]"></span>
              <span className="absolute bottom-0 right-0 border-r-default-accent border-b-default-accent border-r-4 border-b-4 h-[30px] w-[30px]"></span>
            </motion.div>
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
