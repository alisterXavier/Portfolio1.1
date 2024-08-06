'use client';
export { About } from './about';
export { Connect } from './connect';
export { Expertise } from './expertise';
export { Projects } from './projects';
export { Stack } from './stack';
export { Titles } from './titles';
export { Work } from './work';
export { Socials } from './socials';
export { Certificates } from './certificates';
export { Profile } from './profile'
import { useCardContext } from '@/app/contexts';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { mergeClassNames } from '../classNames';

export const CardWrapper = ({
  className,
  children,
  targetClass,
}: {
  className: string;
  targetClass: string;
  children: React.ReactNode;
}): JSX.Element => {
  const router = useRouter();
  const excludedCards = ['stack', 'random', 'connect', 'expertise'];
  const { setState } = useCardContext();
  return (
    <motion.div
      layoutId={targetClass}
      className={mergeClassNames(className, 'hero-card bg-default-sub-bg cursor-pointer rounded-[10px] h-full overflow-hidden')}
      data-hero={targetClass}
      onClick={() => {
        if (excludedCards.includes(targetClass)) return;
        setState(targetClass);
        setTimeout(() => {
          router.push(`/${targetClass}`);
        }, 500);
      }}
    >
      {children}
    </motion.div>
  );
};
