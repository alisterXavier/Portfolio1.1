'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import SplitType from 'split-type';
import { mergeClassNames } from '../classNames';

export const executeMainPageExitAnimation = (
  page: string,
  setPage: (val: string) => void
) => {
  const chars = document
    .querySelector('[data-hero-title]')
    ?.querySelectorAll('.char');
  var charsList;

  if (chars) charsList = Array.from(chars as any);

  const timeline = gsap.timeline();
  timeline.to(charsList ?? null, {
    translateY: '-30px',
    translateX: '0px',
    filter: 'blur(8px)',
    opacity: 0,
    skewX: '5deg',
    stagger: {
      amount: 0.5,
    },
    duration: 0.5,
    onComplete: () => {
      setPage(page);
    },
  });
};

type closeCardType = {
  setState: Dispatch<SetStateAction<string | null>>;
};
export const closeCard = ({ setState }: closeCardType) => {
  window.scrollTo(0, 0);
  setState(null);
};
type MenuType = {
  targetClass: string;
  setState: React.Dispatch<SetStateAction<string | null>>;
  router: AppRouterInstance;
  back?: { toggle: any; setToggle: Dispatch<SetStateAction<any | null>> };
};
export const Menu = ({ targetClass, setState, router, back }: MenuType) => {
  const handleClick = (e: React.MouseEvent) => {
    if (!back?.toggle) {
      setTimeout(() => {
        closeCard({ setState });
        setTimeout(() => {
          router.back();
        }, 500);
      }, 500);
    }
    back?.setToggle(null);
  };
  return (
    <div
      className={mergeClassNames(
        'cross cursor-pointer fixed z-[4] top-10 right-[5%]',
        back?.toggle && 'back'
      )}
      onClick={handleClick}
    >
      <div className=" w-full h-full">
        <span className="straight bg-default-accent"></span>
        <span className="straight bg-default-accent"></span>
      </div>
      <div className="absolute z-[1]">
        <span className="icon arrow border-l-[5px] border-t-[5px] border-default-accent"></span>
      </div>
    </div>
  );
};

interface BaseMarqueeProps {
  baseVelocity: number;
  classes?: string;
  texts: string[];
  direction?: 'right' | 'left';
  styles?: {
    color?: string;
    subColor?: string;
    size?: number;
    height?: number;
  };
  variants?: 'outlined' | 'none';
}
interface DirectionalMarqueeProps extends BaseMarqueeProps {
  directional: true;
  parentClassName: string;
}
interface NonDirectionalMarqueeProps extends BaseMarqueeProps {
  directional: false;
  parentClassName?: never;
}
type MarqueeProps = DirectionalMarqueeProps | NonDirectionalMarqueeProps;
export const Marquee = ({
  texts,
  classes = '',
  baseVelocity = 0.5,
  directional = false,
  parentClassName,
  styles,
  direction = 'right',
  variants = 'none',
}: MarqueeProps) => {
  let x = 0,
    animateFrameId: number;

  let directionPos = direction === 'right' ? 1 : -1;
  const { color, size = 30, height = 50 } = styles!;
  const marquee__Ref = useRef<HTMLDivElement | null>(null);
  const { contextSafe } = useGSAP({
    scope: marquee__Ref,
    revertOnUpdate: true,
  });

  var textValue;

  if (texts.length < 3) {
    textValue = Array.from({ length: 6 }, () => texts)
      .flat()
      .slice(0, 6);
  } else {
    textValue = texts.slice(0, 6);
  }

  useEffect(() => {
    const elem = document.querySelector(`.${parentClassName}`);

    start(elem);

    return () => {
      cancelAnimationFrame(animateFrameId);
    };
  }, []);

  const start = contextSafe((elem: Element | null) => {
    gsap.set('.text__container__1', {
      left: marquee__Ref
        .current!.querySelector('.text__container__1')!
        .getBoundingClientRect().width,
    });
    gsap.set(elem, {
      height: elem?.getBoundingClientRect().height,
    });
    if (directional) {
      gsap.to('.slider', {
        scrollTrigger: {
          trigger: elem,
          scrub: true,
          start: 0,
          end: `bottom bottom`,
          // markers: true,
          onUpdate: (e) => (directionPos = e.direction * -1),
        },
      });
    }
    animateFrameId = requestAnimationFrame(animate);
  });

  const animate = contextSafe(() => {
    if (x > 0) {
      x = -100;
    } else if (x < -100) {
      x = 0;
    }

    gsap.set('.text__container__1', {
      xPercent: x,
    });
    gsap.set('.text__container__2', {
      xPercent: x,
    });
    animateFrameId = requestAnimationFrame(animate);

    x += baseVelocity * directionPos;
  });

  return (
    <div
      className="w-full overflow-hidden marquee-container"
      ref={marquee__Ref}
    >
      <div
        className={mergeClassNames(`slider w-full relative`, classes)}
        style={{
          height: `${height}px`,
        }}
      >
        <div className={`text__container__1 whitespace-nowrap absolute top-0`}>
          {textValue.map((text, index) => {
            return (
              <span
                key={index}
                className={`m-0 ml-10`}
                style={{
                  color: color,
                  fontSize: `${size}px`,
                }}
              >
                {text}
              </span>
            );
          })}
        </div>
        <div className={`text__container__2 whitespace-nowrap absolute top-0`}>
          {textValue.map((text, index) => {
            return (
              <span
                key={index}
                className={`m-0 ml-10`}
                style={{
                  color: color,
                  fontSize: `${size}px`,
                }}
              >
                {text}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

type StaggerTextTypes = {
  text: string;
  state?: boolean;
  from: gsap.TweenVars;
  to?: gsap.TweenVars;
  scroller?: string;
  staggerAmt?: number;
  duration?: number;
  delay?: number;
  styles?: {
    size?: number;
    color?: string;
    overflow?: 'hidden' | 'scroll' | 'visible';
  };
  scrollTrigger?: string;
  staggerOnScroll?: boolean;
  markers?: boolean;
};
export const StaggerText = ({
  text,
  state,
  styles,
  from,
  to,
  staggerAmt,
  duration,
  delay,
  scroller,
  scrollTrigger,
  staggerOnScroll,
  markers,
}: StaggerTextTypes) => {
  const ref = useRef<HTMLDivElement>(null);
  const { color, size = 30, overflow = 'hidden' } = styles!;
  useGSAP(
    () => {
      const splitText = new SplitType(ref.current!);
      const chars = splitText.chars;
      const elem = document.querySelector(`.${scrollTrigger}`);
      const scrollerElem = document.querySelector(`.${scroller}`);

      gsap.fromTo(
        chars,
        {
          translateY: from.translateY,
          translateX: from.translateX,
          filter: from.filter,
          skewY: from.skewY ?? '0deg',
          skewX: from.skewX ?? '0deg',
          opacity: from.opacity,
          ease: from.ease,
        },
        {
          translateY: to?.translateY ?? 0,
          translateX: to?.translateX ?? 0,
          filter: to?.filter ?? 'blur(0px)',
          opacity: to?.opacity ?? 1,
          skewX: to?.skewX ?? '0deg',
          skewY: to?.skewY ?? '0deg',
          ease: to?.ease ?? from.ease,
          stagger: {
            amount: staggerAmt,
          },
          scrollTrigger: {
            scroller: scrollerElem,
            trigger: elem,
            start: staggerOnScroll ? 0 : 'top center',
            scrub: staggerOnScroll,
            markers: markers ?? false,
          },
          duration: duration,
          delay: delay ?? 0,
        }
      );
    },
    {
      dependencies: [ref],
      scope: ref,
      revertOnUpdate: true,
    }
  );

  return (
    <div ref={ref} className="stagger-container">
      <p
        className={`stagger`}
        style={{
          color: color,
          fontSize: `${size}px`,
          overflow: overflow,
        }}
      >
        {text}
      </p>
    </div>
  );
};

type TextLoopVerticalTypes = {
  wordList: string[];
};
export const TextLoopVertical = ({
  wordList,
}: TextLoopVerticalTypes): JSX.Element => {
  const [state, setState] = useState<{ [key: string]: Array<string> }>({});
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grouped: typeof state = {};
    wordList.forEach((i, index) => {
      const split = i.split(' ');
      const lastWord = split.pop() as string;
      const remainingJoin = split.join(' ');
      if (!grouped[lastWord]) {
        grouped[lastWord] = [];
      }
      grouped[lastWord].push(remainingJoin);
    });

    setState(grouped);
  }, [wordList]);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        repeat: -1,
        defaults: {
          duration: 0.5,
        },
      });

      (gsap.utils.toArray('.expertise_box') as Element[]).forEach((item) => {
        const { classList } = item;
        var isGroup: Boolean = false;
        var groupItems: NodeList | Node[];
        if (classList.contains('expertise_group')) isGroup = true;

        const animate = () => {
          const tl2 = gsap.timeline({});

          tl.from(item, {
            opacity: 0,
            yPercent: -120,
          })
            .to(item, {
              yPercent: 0,
            })
            .to(item, {
              opacity: 1,
              duration: 0.5,
            });

          if (isGroup) {
            const firstItemParent = groupItems[0].parentElement;
            const firstGroupItem = groupItems[0];
            const otherGroupItems = Array.from(groupItems).slice(1);
            const width = gsap.getProperty(firstGroupItem, 'width');
            tl2.to(firstItemParent, {
              width: `${width}px`,
            });

            tl2
              .from(firstGroupItem, {
                opacity: 0,
                yPercent: -120,
              })
              .to(firstGroupItem, {
                yPercent: 0,
              })
              .to(firstGroupItem, {
                opacity: 1,
                duration: 0.5,
              })
              .to(firstGroupItem, {
                yPercent: 120,
                opacity: 0,
              });

            otherGroupItems.forEach((i, index) => {
              const parent = i.parentElement;
              const width = gsap.getProperty(i, 'width');
              tl2.to(parent, {
                width: `${width}px`,
              });
              tl2
                .from(i, {
                  opacity: 0,
                  yPercent: -120,
                })
                .to(i, {
                  yPercent: 0,
                })
                .to(i, {
                  opacity: 1,
                  duration: 0.5,
                });

              if (index < otherGroupItems.length - 1) {
                tl2.to(i, {
                  yPercent: 120,
                  opacity: 0,
                });
              }
            });
          }
          tl.add(tl2, '-=2.5');
          tl.to(item, {
            yPercent: 120,
            opacity: 0,
          });
        };

        if (isGroup) {
          groupItems = item.querySelectorAll('.expertise_group_item');
        }
        animate();
      });
    },
    { scope: ref, dependencies: [state] }
  );

  return (
    <div
      className="flex items-center relative h-[50px] text-default-accent text-[30px] overflow-hidden"
      ref={ref}
    >
      {Object.keys(state).map((i, index) => {
        if (state[i].length <= 1) {
          return (
            <div key={index} className="expertise_box absolute">
              <p>{...state[i]} {i}</p>
            </div>
          );
        } else {
          return (
            <div
              key={index}
              className="expertise_group expertise_box absolute flex"
            >
              <div className="expertise_group_container relative">
                {state[i].map((item, innerIndex) => {
                  return (
                    <div
                      className="expertise_group_item absolute left-0"
                      key={innerIndex}
                    >
                      <p className="whitespace-nowrap">{item}&nbsp;</p>
                    </div>
                  );
                })}
              </div>
              <p>{i}</p>
            </div>
          );
        }
      })}
    </div>
  );
};
