'use client';
import { useCardContext } from '@/app/contexts';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ReactElement } from 'react';
import { ImCross } from 'react-icons/im';
import { mergeClassNames } from '../../components';
import { Marquee, StaggerText } from '../../components/animation';
import { handleClick } from '../utils';

type CompanyType = {
  image: ReactElement;
  classes?: string;
  position: string[];
  company: string;
  description: string;
  date: string;
};

const Company = ({
  image,
  classes,
  position,
  company,
  date,
  description,
}: CompanyType): JSX.Element => {
  const staggerClass = `work__${company.replaceAll(' ', '_')}`;
  return (
    <div
      className={mergeClassNames(
        'w-full h-screen md:h-[90vh] md:flex items-center',
        classes,
        staggerClass
      )}
    >
      <div className="md:w-[50%] h-[30%] md:h-[50%] flex items-center">
        <div className="w-full h-full">
          <figure className="work__1__image relative w-full h-full border">
            {image}
          </figure>
        </div>
      </div>
      <div className="md:w-[50%] h-[50%] text-default-accent flex flex-col">
        <div className="space-bold">
          <Marquee
            styles={{
              size: 70,
              height: 110,
            }}
            classes="border-t-default-accent border-b-default-accent border-t-2 border-b-3"
            variants="none"
            baseVelocity={0.1}
            directional={false}
            texts={position}
          />
        </div>
        <div className="p-5">
          <div className="w-full flex justify-between items-center">
            <h2 className="text-[30px]">{company}</h2>
            <p>{date}</p>
          </div>
          <div className="w-full mt-5">
            <StaggerText
              styles={{
                size: 15,
              }}
              from={{
                opacity: 0,
                translateY: '100px',
              }}
              staggerAmt={0.1}
              delay={0.5}
              duration={0.5}
              text={description}
              scroller={'modal_container'}
              scrollTrigger={staggerClass}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Work = () => {
  const targetClass = 'work';
  const router = useRouter();
  const { setState } = useCardContext();

  useGSAP(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: '.work_container',
        scrub: true,
      },
    });
  });

  return (
    <>
      <div className="w-full work_container">
        <ImCross
          size={30}
          className="fixed z-[2100] top-10 right-[5%]"
          color="white"
          onClick={() => {
            handleClick({ setState, targetClass, router });
          }}
        />
        <Company
          image={<Image src={''} alt="" sizes="100" fill />}
          position={['Web Developer']}
          company="Dynasty Real Estate"
          date={'04/2024 - 05/2024'}
          description="Monitoring large-scale streaming content from Youtube, Twitch &
              TikTok. Their tools help you to monitor your brands, analyse market
              trends or identify subjects not corresponding to the policy
              requirements. You receive finalized data and reports that leave
              you with decision-making. Their data helps private companies,
              compliance providers, and governments. Save your time. Be a step
              ahead of others."
        />
        <Company
          classes="flex-row-reverse"
          image={<Image src={''} alt="" sizes="100" fill />}
          position={['Front-End Engineer', 'Front-End Developer']}
          date={'04/2023 - 04/2024'}
          company="Nysta - AI Driven Startup"
          description="Monitoring large-scale streaming content from Youtube, Twitch &
              TikTok. Their tools help you to monitor your brands, analyse market
              trends or identify subjects not corresponding to the policy
              requirements. You receive finalized data and reports that leave
              you with decision-making. Their data helps private companies and
              compliance providers. Save your time. Be a step
              ahead of others."
        />
        <Company
          image={<Image src={''} alt="" sizes="100" fill />}
          position={['Frontend Developer']}
          company="Freelancer"
          date={'03/2021 - 03/2022'}
          description="Monitoring large-scale streaming content from Youtube, Twitch &
              TikTok. Their tools help you to monitor your brands, analyse market
              trends or identify subjects not corresponding to the policy
              requirements. You receive finalized data and reports that leave
              you with decision-making. Their data helps private companies,
              compliance providers, and governments. Save your time. Be a step
              ahead of others."
        />
      </div>
      <div className="relative h-[30vh] overflow-hidden">
        <div className="absolute top-[40%] -left-[5%] rotate-[10deg] w-full h-full text-default-accent z-10 space-bold">
          <Marquee
            styles={{
              size: 70,
              height: 110,
            }}
            classes="border-t-default-accent border-b-default-accent border-t-2 border-b-3 bg-default-bg"
            variants="none"
            baseVelocity={0.1}
            directional={false}
            texts={['Comming Soon']}
          />
        </div>
        <div className="absolute top-[40%] left-[5%] -rotate-[10deg] w-full h-full text-default-accent z-10 space-bold">
          <Marquee
            styles={{
              size: 70,
              height: 110,
            }}
            direction="left"
            classes="border-t-default-accent border-b-default-accent border-t-2 border-b-3 bg-default-bg"
            variants="none"
            baseVelocity={0.1}
            directional={false}
            texts={['Comming Soon']}
          />
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-default-sub-bg blur-[10px]"></div>
      </div>
    </>
  );
};

export default Work;
