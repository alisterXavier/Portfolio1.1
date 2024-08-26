'use client';
import { mergeClassNames } from '@/app/components';
import { useCardContext } from '@/app/contexts';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ImCross } from 'react-icons/im';
import SplitType, { TargetElement } from 'split-type';
import { handleClick } from '../utils';

const work_details = [
  {
    position: ['Web Developer'],
    company: 'Dynasty Real Estate',
    date: '04/2024 - 05/2024',
    color: 'red',
    description:
      'Monitoring large-scale streaming content from Youtube, Twitch & TikTok. Their tools help you to monitor your brands, analyse market trends or identify subjects not corresponding to the policy requirements. You receive finalized data and reports that leave you with decision-making. Their data helps private companies, compliance providers, and governments. Save your time. Be a step ahead of others.',
  },
  {
    position: ['Frontend Developer'],
    company: 'Nysta - AI Driven Startup',
    date: '04/2023 - 04/2024',
    description:
      'Monitoring large-scale streaming content from Youtube, Twitch & TikTok. Their tools help you to monitor your brands, analyse market trends or identify subjects not corresponding to the policy requirements. You receive finalized data and reports that leave you with decision-making. Their data helps private companies and compliance providers. Save your time. Be a step ahead of others.',
  },
  {
    position: ['Frontend Developer'],
    company: 'Freelancer',
    date: '03/2021 - 03/2022',
    color: 'yellow',
    description:
      'Monitoring large-scale streaming content from Youtube, Twitch & TikTok. Their tools help you to monitor your brands, analyse market trends or identify subjects not corresponding to the policy requirements. You receive finalized data and reports that leave you with decision-making. Their data helps private companies, compliance providers, and governments. Save your time. Be a step ahead of others.',
  },
];

const Work = () => {
  const targetClass = 'work';
  const router = useRouter();
  const { setState } = useCardContext();

  useGSAP(() => {
    let sections = document.querySelectorAll('.work_details_section'),
      images = document.querySelectorAll('.work_image_section'),
      outerWrappers = gsap.utils.toArray('.work_details_outer'),
      innerWrappers = gsap.utils.toArray('.work_details_inner'),
      details = document.querySelectorAll('.work_details'),
      currentIndex = -1,
      wrap = gsap.utils.wrap(0, sections.length),
      animating: boolean;

    const scroll = (index: number, direction: number) => {
      index = wrap(index);
      animating = true;
      let fromTop = direction === -1,
        dFactor = fromTop ? -1 : 1,
        tl = gsap.timeline({
          defaults: { duration: 1.25, ease: 'power1.inOut' },
          onComplete: () => {
            animating = false;
          },
        });

      if (currentIndex >= 0) {
        gsap.set(sections[currentIndex], { zIndex: 0 });
        tl.to(images[currentIndex], { yPercent: -100 * dFactor })
          .to(details[currentIndex], { yPercent: -15 * dFactor })
          .set(sections[currentIndex], { autoAlpha: 0 });
      }

      gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });

      let work_pos = new SplitType(
          details[index].querySelector('.work_position') as TargetElement
        ).chars!,
        work_date = new SplitType(
          details[index].querySelector('.work_date') as TargetElement
        ).chars!,
        work_company = new SplitType(
          details[index].querySelector('.work_company') as TargetElement
        ).chars!;

      tl.fromTo(
        images[index],
        {
          yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor),
        },
        {
          ease: 'elastic.inOut',
          autoAlpha: 1,
          yPercent: 0,
        },
        0
      )
        .fromTo(
          [outerWrappers[index], innerWrappers[index]],
          {
            yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor),
          },
          {
            yPercent: 0,
          },
          0
        )
        .fromTo(details[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
        .fromTo(
          [work_company, work_date, work_pos],
          { autoAlpha: 0, yPercent: 15 * dFactor },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.5,
            ease: 'power2',
            stagger: {
              each: 0.009,
              from: 'random',
            },
          },
          0.2
        );

      currentIndex = index;
    };

    Observer.create({
      type: 'wheel,touch,pointer',
      wheelSpeed: -1,
      onDown: () => !animating && scroll(currentIndex - 1, -1),
      onUp: () => !animating && scroll(currentIndex + 1, 1),
      tolerance: 10,
      preventDefault: true,
    });
    scroll(0, 1);
  });

  return (
    <>
      <div className="w-screen h-screen work_container flex">
        <ImCross
          size={30}
          className="fixed z-[2100] top-10 right-[5%]"
          color="white"
          onClick={() => {
            handleClick({ setState, targetClass, router });
          }}
        />
        <div className="w-full h-full relative">
          {work_details.map((item, index) => {
            return (
              <div
                className="work_section absolute flex-col md:flex-row flex items-center justify-center w-full h-full"
                key={index}
              >
                <div className="work_image_section relative w-full md:w-[40%] h-[50%] md:h-screen invisible overflow-hidden">
                  <div
                    className={mergeClassNames(
                      'h-full w-full flex items-center justify-center'
                    )}
                  >
                    <div className="w-[50%] h-[50%]">
                      <figure className="work_image relative w-full h-full border">
                        <Image src={''} alt="" sizes="100" fill />
                      </figure>
                    </div>
                  </div>
                </div>
                <div className="work_details_section relative bg-[var(--main)] md:bg-transparent w-full md:w-[60%] h-[50%] md:h-screen invisible p-10">
                  <div className="work_details_outer w-full h-full overflow-y-hidden">
                    <div
                      className={mergeClassNames(
                        'work_details_inner bg-[var(--main)] h-full w-full flex items-center justify-center overflow-y-hidden'
                      )}
                    >
                      <div className="work_details w-full text-[var(--accent)] flex flex-col">
                        <div className="space-bold w-full">
                          <p className="work_company overflow-hidden tracking-widest text-[10px]">
                            {item.company}
                          </p>
                        </div>
                        <div className="">
                          <h2 className="text-[20px] md:text-[30px] w-full work_position overflow-hidden tracking-widest">
                            {item.position}
                          </h2>
                          <p className="work_date overflow-hidden tracking-widest">
                            {item.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Work;
