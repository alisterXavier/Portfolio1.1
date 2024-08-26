import { useCardContext } from '@/app/contexts';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { mergeClassNames } from '../classNames';
import { useRef } from 'react';
import gsap from 'gsap';

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
  const excludedCards = ['stack', 'random', 'connect', 'expertise', 'socials'];
  const { setState } = useCardContext();
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (excludedCards.includes(targetClass)) {
      return;
    }

    var container = document.querySelector('.modal_container');
    container?.setAttribute('data-card', targetClass);

    let app_bounding_rect = container!.getBoundingClientRect(),
      tile_bounding_rect = ref.current!.getBoundingClientRect(),
      translateX = tile_bounding_rect.left + 'px',
      translateY = tile_bounding_rect.top + 'px',
      scaleX = tile_bounding_rect.width / app_bounding_rect.width,
      scaleY = tile_bounding_rect.height / app_bounding_rect.height;
    window.scrollTo(0, 0);
    const tl = gsap.timeline();
    tl.to(container, {
      autoAlpha: 1,
      background: 'var(--sub)',
    }).fromTo(
      container,
      {
        translateX: translateX,
        translateY: translateY,
        scaleX: scaleX,
        scaleY: scaleY,
        borderRadius: '10px',
        background: 'var(--main)',
      },
      {
        translateX: 0,
        translateY: 0,
        scaleX: 1,
        scaleY: 1,
        borderRadius: 0,
        ease: 'power3.in',
        onComplete: () => {
          router.push(`/${targetClass}`);
        },
      }
    );
    setState(targetClass);
  };

  return (
    <motion.div
      layoutId={targetClass}
      className={mergeClassNames(
        parentClasses,
        targetClass,
        'hero-card cursor-pointer rounded-[10px] w-full h-full overflow-hidden'
      )}
      data-hero={targetClass}
      onClick={handleClick}
      ref={ref}
    >
      <div
        className={mergeClassNames(
          getRandomTransformStyle(),
          'w-full h-full bg-[var(--sub)]',
          className
        )}
      >
        {children}
      </div>
    </motion.div>
  );
};
