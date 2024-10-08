'use client';
import { StaggerText } from '@/app/components/cards/about';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';

export type ProjectType = {
  title: string;
  stack: string[];
  desc: string;
  git_link: string;
  app_link?: string;
  completed: boolean;
  img: string[];
};

const Project = ({
  project,
  index,
}: {
  project: ProjectType;
  index: number;
}) => {
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      '.project__title',
      {
        fontSize: '60px',
        top: '50%',
        left: '50%',
        translateX: '20%',
        translateY: '20%',
        width: '150%',
      },
      {
        top: 0,
        left: 0,
        translateX: 0,
        translateY: 0,
        fontSize: '30px',
        delay: 0.7,
        width: '100%',
      }
    );
  }, []);

  return (
    <motion.div className="text-[var(--accent)] p-10 z-[1]">
      <motion.div className="w-full h-[90vh] relative grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1">
        <motion.div
          className="w-full h-full md:col-span-1 relative flex flex-col justify-center"
          exit={{
            opacity: 0,
            y: 100,
          }}
        >
          <div className="w-[90%]">
            <div className="project__title w-full z-[1] flex">
              <StaggerText
                from={{
                  opacity: 0,
                  translateY: '100px',
                }}
                staggerAmt={0.08}
                duration={0.5}
                styles={
                  {
                    // color: 'var(--base)',
                  }
                }
                text={project.title}
              />
            </div>
            <div className="w-full mt-5">
              <StaggerText
                from={{
                  opacity: 0,
                  translateY: '100px',
                }}
                staggerAmt={0.08}
                duration={0.5}
                delay={0.5}
                styles={{
                  fontSize: 'text-[10px] md:text-[15px]',
                }}
                text={project.desc}
              />
            </div>
            <div className="w-full mt-5">
              <StaggerText
                from={{
                  opacity: 0,
                  translateY: '100px',
                }}
                staggerAmt={0.08}
                duration={0.5}
                delay={0.5}
                styles={{
                  fontSize: 'text-[10px] md:text-[15px]',
                }}
                text={'Tech Stack:'}
              />
              <div className="flex justify-start flex-wrap">
                <StaggerText
                  from={{
                    opacity: 0,
                    translateY: '100px',
                  }}
                  staggerAmt={0.08}
                  duration={0.5}
                  delay={0.5}
                  styles={{
                    fontSize: 'text-[10px] md:text-[15px]',
                  }}
                  text={project.stack
                    .map((item, index) => {
                      return item;
                    })
                    .join(', ')}
                />
              </div>
            </div>
            <div className="w-full flex justify-between mt-5">
              <Link
                href={project.git_link}
                target="__blank__"
                className="border-[var(--base)] text-[15px]"
              >
                <StaggerText
                  from={{
                    opacity: 0,
                    translateY: '100px',
                  }}
                  staggerAmt={0.08}
                  duration={0.5}
                  delay={0.5}
                  styles={{
                    fontSize: 'text-[10px] md:text-[15px]',
                  }}
                  text={'Github'}
                />
              </Link>
              {project.app_link && (
                <Link
                  href={project.app_link}
                  target="__blank__"
                  className="border-default-accent underline"
                >
                  <StaggerText
                    from={{
                      opacity: 0,
                      translateY: '100px',
                    }}
                    staggerAmt={0.08}
                    duration={0.5}
                    delay={0.5}
                    styles={{
                      fontSize: 'text-[10px] md:text-[15px]',
                    }}
                    text={'App'}
                  />
                </Link>
              )}
            </div>
          </div>
        </motion.div>
        <motion.div className="w-full md:w-[90%] h-full md:col-span-1 flex flex-col justify-center overflow-hidden">
          <motion.div className="project__image w-full h-[70%] md:h-[50%]">
            <motion.figure
              className="relative w-full h-full project__item__inner overflow-hidden"
              layoutId={project.title + index}
            >
              <Image
                src={project.img[0]}
                alt={project.title}
                fill
                sizes="100%"
                className="project__item__inner__content"
              />
            </motion.figure>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Project;
