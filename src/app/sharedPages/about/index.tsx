'use client';
import { useCardContext } from '@/app/contexts';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ImCross } from 'react-icons/im';
import { Marquee, StaggerText } from 'componentopia';
import { handleClick } from '../utils';

const About = () => {
  const targetClass = 'about';
  const router = useRouter();
  const { setState } = useCardContext();
  return (
    <motion.div className="about_container p-10 bg-default-bg">
      <ImCross
        size={30}
        className="sticky top-10 right-10"
        color="white"
        onClick={() => {
          handleClick({ setState, targetClass, router });
        }}
      />
      <div className="h-[80vh] flex items-end !text-default-accent">
        <motion.div className="w-[100%]">
          <StaggerText
            from={{
              translateY: 100,
              opacity: 0,
            }}
            staggerAmt={0.1}
            delay={0.4}
            duration={0.5}
            styles={{
              size: 50,
            }}
            scroller="modal_container"
            // scrollTrigger=''
            text="Hi, I'm Typewriter"
          />
          <Marquee
            parentClassName="about_container"
            baseVelocity={0.1}
            styles={{
              height: 130,
              size: 100,
            }}
            directional={true}
            texts={['Front-End Developer', 'Cloud Engineer']}
          />
        </motion.div>
      </div>
      <div className="h-[100vh] text-[20px] flex items-center justify-center !text-default-accent">
        <StaggerText
          from={{
            translateY: 100,
            opacity: 0,
          }}
          staggerAmt={0.1}
          delay={0.4}
          duration={0.5}
          styles={{
            size: 40,
          }}
          scroller="modal_container"
          // scrollTrigger=""
          text="I specialize in user-friendly systems, backend logic, databases,
            algorithms, and cloud infrastructure.Collaborating with
            designers, project managers, and QA engineers, I ensure smooth
            software delivery.Explore my tech stack for intriguing details
            about previous projects. I'm open to
            collaborations—let's connect!"
        />
        {/* <p className="text-default-accent text-[40px]"></p> */}
      </div>
    </motion.div>
  );
};

export default About;
