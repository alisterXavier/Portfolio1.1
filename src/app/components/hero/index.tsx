'use client';
export { About } from './about';
export { Certificates } from './certificates';
export { Connect } from './connect';
export { Expertise } from './expertise';
export { Profile } from './profile';
export { Projects } from './projects';
export { Socials } from './socials';
export { Stack } from './stack';
export { Work } from './work';
import { useCardContext } from '@/app/contexts';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { mergeClassNames } from '../classNames';

const getRandomTransformStyle = () => {
  var styles = [
    'animate-card-y scale-y-[0%] -translate-y-[100%]',
    'animate-card-x scale-x-[0%] -translate-x-[100%]',
    'animate-card-y scale-y-[0%] translate-y-[100%]',
    'animate-card-x scale-x-[0%] translate-x-[100%]',
  ];
  return styles[Math.floor(Math.random() * styles.length)];
};

export const CardWrapper = ({
  className,
  children,
  targetClass,
  parentClasses,
}: {
  className: string;
  targetClass: string;
  parentClasses: string;
  children: React.ReactNode;
}): JSX.Element => {
  const router = useRouter();
  const excludedCards = [
    'stack',
    'random',
    'connect',
    'expertise',
    'socials',
    'projects',
  ];
  const { setState } = useCardContext();
  return (
    <motion.div
      layoutId={targetClass}
      className={mergeClassNames(
        parentClasses,
        targetClass,
        'hero-card cursor-pointer rounded-[10px] w-full h-full overflow-hidden'
      )}
      data-hero={targetClass}
      onClick={() => {
        if (excludedCards.includes(targetClass)) {
          toast(
            (t) => (
              <span>
                Project section in progress
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="!bg-default-bg ml-2 p-2"
                >
                  Dismiss
                </button>
              </span>
            ),
            {
              duration: 5000,
              className: '!text-default-accent !bg-default-sub-bg',
              style: {},
              position: 'top-right',
            }
          );
          return;
        }
        setState(targetClass);
        setTimeout(() => {
          router.push(`/${targetClass}`);
        }, 500);
      }}
    >
      <div
        className={mergeClassNames(
          getRandomTransformStyle(),
          'w-full h-full bg-default-sub-bg',
          className
        )}
      >
        {children}
      </div>
    </motion.div>
  );
};
