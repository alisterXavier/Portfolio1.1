import { useInitalPageLoadedContext } from '@/app/contexts';
import { CardWrapper } from '../..';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

type TextLoopVerticalTypes = {
  wordList: string[];
  fontSize: string | number;
  height: number;
  color: string;
};
const TextLoopVertical = ({
  wordList,
  color,
  height,
  fontSize,
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

      return () => {
        tl.kill();
      };
    },
    { scope: ref, dependencies: [state], revertOnUpdate: true }
  );

  return (
    <div
      className={`flex items-center relative overflow-hidden`}
      ref={ref}
      style={{
        height: `${height}px`,
        color: color,
      }}
    >
      {Object.keys(state).map((i, index) => {
        if (state[i].length <= 1) {
          return (
            <div key={index} className="expertise_box absolute">
              <p className={`${fontSize}`}>{...state[i]} {i}</p>
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
                      <p className={`whitespace-nowrap ${fontSize}`}>
                        {item}&nbsp;
                      </p>
                    </div>
                  );
                })}
              </div>
              <p className={`${fontSize}`}>{i}</p>
            </div>
          );
        }
      })}
    </div>
  );
};

export const Expertise = () => {
  const { state } = useInitalPageLoadedContext();
  return (
    <CardWrapper
      parentClasses="col-span-4 row-span-1 md:col-span-3 md:row-span-1 !cursor-default"
      targetClass="expertise"
      className="hero_section bg-[var(--sub)] text-[var(--accent)] p-5"
    >
      <div className="text-[var(--accent)]">
        <h1>Expertise</h1>
      </div>
      {state && (
        <TextLoopVertical
          wordList={['Frontend Developer', 'Cloud Engineer', 'DevOps Engineer']}
          fontSize={'text-[20px] md:text-[30px]'}
          color=""
          height={80}
        />
      )}
    </CardWrapper>
  );
};
